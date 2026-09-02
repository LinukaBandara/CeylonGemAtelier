/**
 * INTEGRATION GUIDE FOR NEW FEATURES
 * 
 * All 18 features have been implemented. Here's how to use them:
 * 
 * 1. SEARCH & FILTER
 *    Component: SearchFilter
 *    Usage: <SearchFilter gems={gems} onResults={setResults} />
 *    Utilities: searchGems(), filterGems(), getFilterOptions()
 * 
 * 2. IMAGE GALLERY
 *    Component: ImageGallery
 *    Usage: <ImageGallery images={gem.images} title="Gem" />
 *    Supports lazy loading via LazyImage component
 * 
 * 3. FAVORITES/WISHLIST
 *    Component: WishlistButton
 *    Hook: useWishlist()
 *    Usage: <WishlistButton slug={gem.slug} />
 *    Data stored in localStorage
 * 
 * 4. GEM COMPARISON
 *    Component: CompareGems
 *    Hook: useCompare()
 *    Usage: <CompareGems availableGems={gems} />
 *    Max 3 gems at a time
 * 
 * 5. BREADCRUMB NAVIGATION
 *    Component: Breadcrumb
 *    Usage: <Breadcrumb items={[{label: "Home", href: "/"}, ...]} />
 *    Semantic HTML for accessibility
 * 
 * 6. ADVANCED ENQUIRY FORM
 *    Component: EnhancedEnquiryForm
 *    Usage: <EnhancedEnquiryForm gems={gems} />
 *    Features: Gem selection, budget, specifications, preferences
 * 
 * 7. RELATED GEMS
 *    Component: RelatedGems
 *    Utility: findRelatedGems()
 *    Usage: <RelatedGems gems={relatedGems} />
 *    Auto-finds similar stones by color, cut, collection
 * 
 * 8. TESTIMONIALS
 *    Component: Testimonials
 *    Data: testimonials array in data/testimonials.ts
 *    Usage: <Testimonials />
 * 
 * 9. GEM SPECIFICATIONS TABLE
 *    Component: GemSpecsTable
 *    Usage: <GemSpecsTable gem={gem} />
 *    Displays all gem specifications in formatted table
 * 
 * 10. MOBILE OPTIMIZATION
 *     All components are fully responsive (mobile-first)
 *     Tested breakpoints: sm, md, lg, xl
 * 
 * 11. DARK MODE
 *     Hook: useTheme()
 *     Component: ThemeToggle
 *     CSS: Dark mode colors defined in globals.css
 *     Usage: <ThemeToggle /> - automatic localStorage sync
 * 
 * 12. LAZY LOADING
 *     Component: LazyImage
 *     Usage: <LazyImage src={url} alt="text" />
 *     Native lazy loading + fade-in animation
 * 
 * 13. SOCIAL SHARE BUTTONS
 *     Component: SocialShare
 *     Usage: <SocialShare title="Gem" url={url} />
 *     Platforms: Twitter, Facebook, LinkedIn, Email, Copy Link
 * 
 * 14. NEWSLETTER SIGNUP
 *     Component: NewsletterSignup
 *     Usage: <NewsletterSignup />
 *     Email stored in localStorage (replace with API call)
 * 
 * 15. BLOG CATEGORIES/TAGS
 *     Component: BlogTags
 *     Data: blogTags array in data/testimonials.ts
 *     Usage: <BlogTags currentTag={tag} />
 *     8 predefined tags with links
 * 
 * 16. AR GEM VIEWER
 *     Component: ARGemViewer
 *     Usage: <ARGemViewer gemName="Sapphire" modelUrl={url} />
 *     Ready for model-viewer.js integration
 * 
 * 17. LIVE CHAT
 *     Component: LiveChat
 *     Already integrated in root layout
 *     Floating button in bottom-right, expandable chat window
 * 
 * 18. MULTI-LANGUAGE
 *     Component: LanguageSwitcher
 *     Data: languages array in data/testimonials.ts
 *     Usage: <LanguageSwitcher />
 *     7 languages supported (en, es, fr, de, ja, zh, ar)
 * 
 * EXAMPLE INTEGRATION:
 * 
 * import { GemListings } from "@/components/GemListings";
 * import { Testimonials } from "@/components/Testimonials";
 * import { NewsletterSignup } from "@/components/NewsletterSignup";
 * 
 * export default function CollectionPage() {
 *   return (
 *     <>
 *       <GemListings collection="ceylon-sapphires" title="Ceylon Sapphires" />
 *       <Testimonials />
 *       <NewsletterSignup />
 *     </>
 *   );
 * }
 * 
 * HOOKS AVAILABLE:
 * - useLocalStorage(key, initialValue) - Generic localStorage hook
 * - useWishlist() - Wishlist management
 * - useTheme() - Dark mode toggle
 * - useCompare() - Gem comparison cart
 * 
 * UTILITIES AVAILABLE:
 * - searchGems(gems, query)
 * - filterGems(gems, filters)
 * - findRelatedGems(gem, allGems, limit)
 * - sortGems(gems, by)
 * - estimatePrice(carat, variant)
 * - getFilterOptions(gems, field)
 */
