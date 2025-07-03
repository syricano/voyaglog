const voyagStyle = {
  // === Layout & Containers ===
  pageContainer: "min-h-screen bg-base-100 flex flex-col items-center justify-center px-4 md:px-0",
  sectionContainer: "container mx-auto px-4 md:px-0 py-8",
  formContainer: "max-w-2xl w-full bg-base-100 shadow-lg rounded-lg p-8 border border-base-300",
  cardBody: "card-body flex flex-col flex-grow gap-4",

  // Dashboard

  dashboardContainer:
  "grid grid-flow-col grid-rows-3 gap-4",


  // === Hero Sections (Shared) ===
  heroSection: "text-center py-24 bg-base-200 rounded-lg shadow-lg mx-4 md:mx-0",
  heroTitle:
    "text-5xl font-extrabold mb-8 bg-gradient-to-r from-indigo-500 via-purple-600 p-2 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-bounceOnce select-none",
  heroSubtitle: "mt-4 text-lg text-base-content/70 transition-colors duration-300 max-w-3xl mx-auto",
  heroButton:
    "btn btn-primary mt-8 px-10 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg",

  // === Section Titles & CTA ===
  sectionTitle:
    "text-3xl font-semibold mb-8 text-base-content select-none border-b-2 border-base-content/20 pb-2",
  ctaSection: "text-center py-12",
  ctaTitle: "text-3xl font-semibold text-base-content select-none",
  ctaButton:
    "btn btn-secondary mt-6 px-12 py-3 text-lg font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg",

  // === Blog Cards ===
  blogGrid: "grid grid-cols-1 md:grid-cols-3 gap-8",
  blogCardContainer:
    "card bg-base-100 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col overflow-hidden border border-base-300",
  cardTitle:
    "card-title text-xl font-bold text-base-content select-none line-clamp-2",
  cardContent: "flex-grow text-base-content/70 mt-2 line-clamp-4",
  readMoreButton:
    "btn btn-sm btn-outline hover:bg-primary hover:text-white transition-colors duration-300 rounded",

  // === Blog Details ===
  blogDetailsWrapper: "container mx-auto px-4 md:px-0 py-12 max-w-4xl",
  blogDetailsTitle:
    "text-4xl font-bold mb-6 text-base-content select-none leading-tight",
  blogDetailsMeta: "text-base-content/60 mb-8 italic tracking-wide",
  blogDetailsImage:
    "w-full md:w-3/4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out mb-8 mx-auto cursor-pointer",
  blogDetailsContent:
    "text-base-content/80 leading-relaxed mb-12 prose prose-indigo max-w-none",
  blogDetailsBack:
    "btn btn-secondary mt-6 px-12 py-3 text-lg font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 rounded",

  // === About Page ===
  aboutWrapper:
    "max-w-4xl mx-auto p-10 mt-10 bg-base-200 rounded shadow-md flex-1/2 prose prose-indigo",
  aboutTitle:
    "text-5xl font-extrabold mb-8 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-md animate-bounceOnce select-none",
  aboutParagraph:
    "mb-6 text-lg leading-relaxed hover:text-primary transition-colors duration-300 cursor-pointer",

  // === Forms ===
  form: "space-y-6",
  input:
    "input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition",
  textarea:
    "textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition",
  submitButton:
    "btn btn-primary w-full p-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg",
  uploadImageBtn:  
    "inset-shadow-sm p-3 inset-shadow-indigo-500",

  // === Signup / Login Pages ===
  signupWrapper:
    "max-w-md mx-auto p-6 mt-10 border rounded-lg shadow-lg bg-base-100",
  signupTitle: "text-3xl mb-6 font-semibold text-center",
  errorText:
    "text-red-600 font-medium mb-4 text-center select-none",
  loginContainer:
    "flex flex-col items-center justify-center min-h-screen bg-base-100 px-4",
  loginCard:
    "card w-full max-w-sm bg-base-100 shadow-lg p-8 rounded-lg",
  loginTitle:
    "text-2xl font-semibold mb-6 text-center",
  loginText:
    "mt-4 text-center text-sm text-base-content/70",
  loginLink:
    "text-primary underline hover:text-primary-focus transition-colors duration-300 cursor-pointer",
  loginButton:
    "btn btn-primary w-full py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg",

  // === Images ===
  featuredImage:
    "w-full max-w-xs h-auto rounded-md object-cover mt-4",

  // === Footer ===
  footer: "bg-base-200 text-base-content py-8 mt-20",
  footerContainer:
    "container mx-auto px-4 flex flex-col md:flex-row justify-between items-center",
  footerText: "text-sm select-none",
  footerLinks: "flex space-x-6 mt-4 md:mt-0",
  footerLink:
    "hover:text-primary transition-colors duration-300 cursor-pointer select-none",

  dashboardWrapper: "p-8 max-w-7xl mx-auto space-y-10",
  dashboardProfileCard: "flex-1 bg-base-200 p-6 rounded shadow-md max-w-md",
  dashboardSectionCard: "bg-base-200 p-6 rounded shadow-md",

  // Buttons used inside UserBlogs editing
  btnSuccessSmall: "btn btn-success btn-sm",
  btnGhostSmall: "btn btn-ghost btn-sm",
  btnErrorSmall: "btn btn-error btn-sm",

  // Card actions wrapper
  cardActions: "card-actions justify-end mt-4 gap-2",

  // File input wrapper (for spacing)
  fileInputWrapper: "mt-2",

  // Preview image margin top
  imagePreviewMarginTop: "mt-4",
  dashboardTopSection: "flex flex-col md:flex-row gap-8",
  dashboardCardOneThird: "w-full md:w-1/3 bg-base-200 p-6 rounded shadow-md",
  dashboardBlogsTwoThird: "w-full md:w-2/3 mx-auto bg-base-200 p-6 rounded shadow-md mt-10",
};
export default voyagStyle;
