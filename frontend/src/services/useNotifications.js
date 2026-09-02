import { useCallback, useRef, useState } from "react";
import { api, unwrapCollection } from "./api";

const STORAGE_KEY = "cga_read_notifications";

function getReadIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}

function saveReadIds(set) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {}
}

/**
 * Builds a list of actionable notifications from available API data.
 * No dedicated notifications endpoint is required — derived from summary.
 *
 * refresh() is idempotent per session: repeated calls within the same
 * component mount only fetch once. The panel calls refresh() on open.
 */
export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [readIds, setReadIds]             = useState(getReadIds);
  const [loading, setLoading]             = useState(false);
  const fetched                           = useRef(false);

  const refresh = useCallback(async () => {
    if (fetched.current) return;
    fetched.current = true;
    setLoading(true);

    try {
      const [summaryRaw, certsRaw] = await Promise.allSettled([
        api.get("/api/dashboard/summary"),
        api.get("/api/catalog/certificates"),
      ]);

      const summary = summaryRaw.status === "fulfilled" ? summaryRaw.value : null;
      const certs   = certsRaw.status  === "fulfilled"  ? unwrapCollection(certsRaw.value) : [];

      const list = [];

      if (summary) {
        if (summary.pendingReservations > 0) {
          list.push({
            id: "pending-reservations",
            level: "warning",
            title: "Pending reservations",
            body: `${summary.pendingReservations} reservation${summary.pendingReservations !== 1 ? "s" : ""} awaiting your response.`,
            href: "/reservations",
          });
        }
        if (summary.itemsMissingMedia > 0) {
          list.push({
            id: "missing-media",
            level: "info",
            title: "Missing photography",
            body: `${summary.itemsMissingMedia} stone${summary.itemsMissingMedia !== 1 ? "s" : ""} ${summary.itemsMissingMedia !== 1 ? "have" : "has"} no media on record.`,
            href: "/media",
          });
        }
        if (summary.unverifiedCertificates > 0) {
          list.push({
            id: "unverified-certs",
            level: "info",
            title: "Unverified certificates",
            body: `${summary.unverifiedCertificates} certificate${summary.unverifiedCertificates !== 1 ? "s" : ""} pending laboratory verification.`,
            href: "/certificates",
          });
        }
        if (summary.availableItems === 0 && summary.totalItems > 0) {
          list.push({
            id: "no-available",
            level: "warning",
            title: "No stones available",
            body: "All registered gemstones are currently reserved, sold or unavailable.",
            href: "/inventory",
          });
        }
        if (summary.totalProducts > 0 && summary.publishedProducts === 0) {
          list.push({
            id: "no-published",
            level: "info",
            title: "No published products",
            body: "No products are currently live on the public catalogue.",
            href: "/products",
          });
        }
      }

      // Recent unverified certs (last 30 days) not already covered above
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      const recentUnverified = certs.filter(
        (c) => !c.isVerified && new Date(c.issueDate).getTime() > thirtyDaysAgo
      );
      if (recentUnverified.length > 0 && !list.find((n) => n.id === "unverified-certs")) {
        list.push({
          id: "recent-unverified",
          level: "info",
          title: "Recent unverified certificates",
          body: `${recentUnverified.length} certificate${recentUnverified.length !== 1 ? "s" : ""} added in the last 30 days require verification.`,
          href: "/certificates",
        });
      }

      if (list.length === 0) {
        list.push({
          id: "all-clear",
          level: "success",
          title: "Everything looks good",
          body: "No action items at this time.",
          href: null,
        });
      }

      setNotifications(list);
    } catch {
      // silently fail — notifications are non-critical
    } finally {
      setLoading(false);
    }
  }, []);

  const markRead = useCallback((id) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      saveReadIds(next);
      return next;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setReadIds((prev) => {
      const next = new Set([...prev, ...notifications.map((n) => n.id)]);
      saveReadIds(next);
      return next;
    });
  }, [notifications]);

  const unreadCount = notifications.filter(
    (n) => n.id !== "all-clear" && !readIds.has(n.id)
  ).length;

  return { notifications, loading, refresh, markRead, markAllRead, unreadCount, readIds };
}
