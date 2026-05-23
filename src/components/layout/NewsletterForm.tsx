"use client";

export function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex gap-2"
    >
      <input
        type="email"
        placeholder="Your email"
        className="flex-1 px-4 py-2.5 rounded-full bg-neutral-800 border border-neutral-700 text-white text-sm placeholder-neutral-500 outline-none focus:border-brand-500 transition-colors"
      />
      <button
        type="submit"
        className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-medium transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
