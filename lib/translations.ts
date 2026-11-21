/**
 * Every visible string on the site, in ONE object: `translations.en` and `translations.ar`.
 *
 * The Arabic is written for a Lebanese audience (colloquial where a Beirut
 * shop would be colloquial, e.g. "المنيو", "هلّق", "طلبيتك"), not translated
 * word for word. Western digits and "$" are kept in Arabic, as most Lebanese
 * menus do.
 *
 * Time ranges in Arabic use words ("من 11:00 لـ 23:00") instead of a dash:
 * "11:00–23:00" inside RTL text gets visually reversed by the bidi algorithm.
 */
import type { BranchId } from "./config";
import type { CategoryId, ItemId } from "./menu";

export type Lang = "en" | "ar";

type ItemText = { name: string; desc: string };
type CategoryText = { label: string; tagline: string; imageAlt: string };
type BranchText = { name: string; area: string; blurb: string };

/** Forces `ar` to have exactly the same shape as `en` (compile-time check). */
function defineTranslations<T>(dict: { en: T; ar: T }) {
  return dict;
}

/** Arabic counting words for "item(s)". */
function arItems(n: number): string {
  if (n === 1) return "صنف واحد";
  if (n === 2) return "صنفين";
  if (n <= 10) return `${n} أصناف`;
  return `${n} صنف`;
}

export const translations = defineTranslations({
  en: {
    meta: {
      title: "Dar el Sajj | Shawarma, sajj & grills in Hamra and Jounieh",
      description:
        "Chicken shawarma, spicy sajj wraps, falafel and charcoal grills, made fresh every day in Hamra and Jounieh. Build your order and send it on WhatsApp. A concept project by Mawqe3 Studio.",
      ogAlt: "A mixed grill platter from Dar el Sajj",
    },
    concept: {
      badge: "Concept project by Mawqe3 Studio",
    },
    header: {
      skipToMenu: "Skip to the menu",
      homeLabel: "Dar el Sajj, back to top",
      languageLabel: "Language",
      cartLabel: (n: number) =>
        n === 0 ? "Open your order, it's empty" : `Open your order, ${n} ${n === 1 ? "item" : "items"}`,
    },
    hero: {
      eyebrow: "Shawarma, sajj & charcoal grills",
      titleStart: "Hot off the",
      titleAccent: "sajj,",
      titleEnd: "rolled tight and on its way.",
      lede: "Shawarma, falafel and charcoal grills made fresh every day in Hamra and Jounieh. Build your order here, send it on WhatsApp, done.",
      orderCta: "Order on WhatsApp",
      menuCta: "See the menu",
      facts: ["Pickup or delivery", "Hamra + Jounieh", "Open daily from 11:00"],
      imageAlt: "Mixed grill platter with chicken skewers, kafta, grilled potatoes and dips",
      sticker: "Wraps from",
      tagLabel: "Best seller",
    },
    branches: {
      eyebrow: "Step 1",
      title: "Pick your branch",
      lede: "Your order goes straight to the branch you choose. You can change it later in the cart.",
      selected: "Selected",
    },
    status: {
      checking: "Checking hours…",
      open: "Open now",
      closed: "Closed",
      closesAt: (time: string) => (time === "00:00" ? "closes at midnight" : `closes at ${time}`),
      opensAt: (time: string) => `opens at ${time}`,
      daily: "Daily",
      range: (open: string, close: string) => `${open}–${close}`,
    },
    menu: {
      eyebrow: "Step 2",
      title: "The menu",
      lede: "Prices in USD. Set how many with + and −, then tap Add.",
      categoriesLabel: "Menu categories",
      bestSeller: "Best seller",
      add: "Add",
      added: "Added",
      quantity: (name: string) => `Quantity for ${name}`,
      decrease: "Decrease quantity",
      increase: "Increase quantity",
      addLabel: (qty: number, name: string) => `Add ${qty} ${name} to your order`,
      announceAdded: (qty: number, name: string) => `${qty} × ${name} added to your order`,
    },
    categories: {
      wraps: {
        label: "Wraps",
        tagline: "Rolled to order in fresh saj bread.",
        imageAlt: "Two halves of a chicken wrap with herbs and red cabbage",
      },
      plates: {
        label: "Plates",
        tagline: "Full plates, with all the sides.",
        imageAlt: "Grilled meat skewers with fries, tomatoes and onions",
      },
      sides: {
        label: "Sides",
        tagline: "The small things that make the meal.",
        imageAlt: "Golden fries in a paper-lined basket",
      },
      drinks: {
        label: "Drinks",
        tagline: "Cold, simple, made to go with shawarma.",
        imageAlt: "A tall glass of mint lemonade with lemon slices",
      },
      desserts: {
        label: "Desserts",
        tagline: "Save room. Or don't, and order anyway.",
        imageAlt: "Two pieces of pistachio baklava on a white plate",
      },
    } satisfies Record<CategoryId, CategoryText>,
    items: {
      "chicken-shawarma-wrap": {
        name: "Chicken Shawarma Wrap",
        desc: "Marinated chicken off the spit, toum, pickles and fries, rolled tight in saj bread.",
      },
      "beef-shawarma-wrap": {
        name: "Beef Shawarma Wrap",
        desc: "Slow-roasted beef with tarator, parsley, onion and tomato.",
      },
      "falafel-wrap": {
        name: "Falafel Wrap",
        desc: "Crispy falafel, tahini, pink pickled turnips, tomato and fresh mint.",
      },
      "halloumi-wrap": {
        name: "Halloumi Wrap",
        desc: "Grilled halloumi with tomato, cucumber, olives and a little mint.",
      },
      "spicy-chicken-sajj": {
        name: "Spicy Chicken Sajj",
        desc: "Our signature: chicken, red pepper paste, garlic and melted cheese, pressed on the sajj.",
      },
      "chicken-shawarma-plate": {
        name: "Chicken Shawarma Plate",
        desc: "A full plate of chicken shawarma with fries, toum, pickles and warm bread.",
      },
      "beef-shawarma-plate": {
        name: "Beef Shawarma Plate",
        desc: "Beef shawarma with tarator, hummus, a fresh salad and bread.",
      },
      "mixed-grill-plate": {
        name: "Mixed Grill Plate",
        desc: "Shish taouk, kafta and lamb skewers with grilled vegetables and toum.",
      },
      "falafel-plate": {
        name: "Falafel Plate",
        desc: "Six falafel with hummus, tahini, pickles and a fresh salad.",
      },
      "half-grilled-chicken": {
        name: "Half Grilled Chicken",
        desc: "Charcoal-grilled half chicken with toum, fries and pickles.",
      },
      fries: {
        name: "Fries",
        desc: "Crispy, salted and ready for toum.",
      },
      hummus: {
        name: "Hummus",
        desc: "Smooth chickpeas, tahini, lemon and a swirl of olive oil.",
      },
      tabbouleh: {
        name: "Tabbouleh",
        desc: "Heavy on the parsley, the way it should be, with bulgur, tomato and lemon.",
      },
      "garlic-toum": {
        name: "Garlic Toum",
        desc: "Whipped garlic sauce. Strong, fluffy, addictive.",
      },
      pickles: {
        name: "Pickles",
        desc: "Pink turnips, cucumbers and chillies, pickled in-house.",
      },
      ayran: {
        name: "Ayran",
        desc: "Cold, lightly salted yogurt drink. Shawarma's best friend.",
      },
      lemonade: {
        name: "Lemonade",
        desc: "Freshly squeezed lemons, lightly sweetened.",
      },
      "mint-lemonade": {
        name: "Mint Lemonade",
        desc: "Fresh lemonade blended with mint and crushed ice.",
      },
      "soft-drink": {
        name: "Soft Drink",
        desc: "Cola, orange or lemon. Served cold.",
      },
      water: {
        name: "Water",
        desc: "Still mineral water, 500 ml.",
      },
      "mini-knefe": {
        name: "Mini Knefe",
        desc: "Warm cheese knefe with crunchy semolina and syrup on the side.",
      },
      "baklava-trio": {
        name: "Baklava Trio",
        desc: "Three pieces: pistachio, cashew and walnut.",
      },
      "rice-pudding": {
        name: "Rice Pudding",
        desc: "Creamy, cold and topped with crushed pistachio.",
      },
      "halawet-el-jibn": {
        name: "Halawet el Jibn",
        desc: "Soft cheese rolls filled with ashta, with rose water syrup.",
      },
      "date-cookie": {
        name: "Date Cookie",
        desc: "Buttery cookie with a soft date filling.",
      },
    } satisfies Record<ItemId, ItemText>,
    branchInfo: {
      hamra: {
        name: "Hamra",
        area: "Hamra, Beirut",
        blurb: "Right in the middle of Hamra, for the lunch rush and late dinners.",
      },
      jounieh: {
        name: "Jounieh",
        area: "Jounieh, Keserwan",
        blurb: "Our coastal branch, open an hour later, until midnight.",
      },
    } satisfies Record<BranchId, BranchText>,
    cart: {
      title: "Your order",
      count: (n: number) => `${n} ${n === 1 ? "item" : "items"}`,
      close: "Close your order",
      empty: "Nothing here yet. The menu is one tap away.",
      browse: "Browse the menu",
      remove: (name: string) => `Remove ${name}`,
      quantity: (name: string) => `Quantity for ${name}`,
      each: "each",
      orderType: "Pickup or delivery?",
      pickup: "Pickup",
      delivery: "Delivery",
      branch: "Branch",
      name: "Your name",
      namePlaceholder: "So we know who it's for",
      address: "Delivery address",
      addressPlaceholder: "Area, street, building, floor",
      notes: "Notes",
      optional: "optional",
      notesPlaceholder: "No pickles, extra toum, ring twice…",
      required: "required",
      subtotal: "Subtotal",
      deliveryFee: "Delivery fee",
      total: "Total",
      send: "Send order on WhatsApp",
      needItems: "Add at least one item to send your order.",
      needName: "Add your name to send your order.",
      needAddress: "Add a delivery address to send your order.",
      ready: "WhatsApp opens with your order typed out. Nothing is sent until you press send there.",
    },
    whatsapp: {
      greeting: "Hi Dar el Sajj! I'd like to order:",
      itemLine: (qty: number, name: string, total: string) => `• ${qty}x ${name}: ${total}`,
      subtotal: "Subtotal",
      deliveryFee: "Delivery fee",
      total: "Total",
      type: "Type",
      pickup: "Pickup",
      delivery: "Delivery",
      branch: "Branch",
      name: "Name",
      address: "Address",
      notes: "Notes",
    },
    why: {
      eyebrow: "Why Dar el Sajj",
      title: "Simple food, done properly.",
      blocks: [
        {
          title: "Fresh, every single day",
          body: "Saj bread baked to order, toum whipped every morning, and nothing sits overnight.",
        },
        {
          title: "Fast to your door",
          body: "Wraps are built in minutes and wrapped to stay hot on the ride over.",
        },
        {
          title: "Two branches, same taste",
          body: "Hamra for the city, Jounieh for the coast. Same recipes, same sajj, both kitchens.",
        },
      ],
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Hungry yet?",
      lede: "A look at what comes out of our kitchens.",
      alts: [
        "A beef shawarma wrap with fries tucked inside",
        "Chicken skewers grilling over charcoal",
        "Chicken shawarma in pita with fries and parsley",
        "Friends sharing a table covered in food",
        "Falafel and grilled chicken plate with salad",
        "Crispy fries in a wire basket",
      ],
    },
    locations: {
      eyebrow: "Locations & hours",
      title: "Come say hi",
      lede: "Pick up in person, or order from whichever branch is closest.",
      hours: "Hours",
      mapPreview: "Map preview",
      mapLabel: (area: string) => `Map preview placeholder for ${area}`,
      orderFrom: (name: string) => `Order from ${name}`,
      note: "Concept project: street addresses are left out on purpose.",
    },
    footer: {
      tagline: "Shawarma, sajj and charcoal grills. Hamra + Jounieh.",
      fictional:
        "Dar el Sajj is a fictional restaurant made for a design portfolio. Photos from Unsplash.",
      explore: "Explore",
      follow: "Follow",
      links: { branches: "Branches", menu: "Menu", gallery: "Gallery", locations: "Locations" },
      social: ["Instagram", "TikTok", "Facebook"],
      socialSoon: "(link coming soon)",
      credit: "Concept design by Mawqe3 Studio",
      rights: "Dar el Sajj (fictional)",
    },
    floating: {
      label: (n: number) =>
        n === 0 ? "Open your WhatsApp order" : `Open your WhatsApp order, ${n} ${n === 1 ? "item" : "items"}`,
    },
  },

  ar: {
    meta: {
      title: "دار الصاج | شاورما وصاج ومشاوي بالحمرا وجونية",
      description:
        "شاورما دجاج، صاج حار، فلافل ومشاوي عالفحم، طازة كل يوم بالحمرا وجونية. ركّب طلبيتك وابعتها عالواتساب. مشروع تصميم تجريبي من Mawqe3 Studio.",
      ogAlt: "صينية مشاوي مشكّلة من دار الصاج",
    },
    concept: {
      badge: "مشروع تصميم تجريبي من Mawqe3 Studio",
    },
    header: {
      skipToMenu: "روح عالمنيو",
      homeLabel: "دار الصاج، رجوع لفوق",
      languageLabel: "اللغة",
      cartLabel: (n: number) => (n === 0 ? "افتح طلبيتك، فاضية" : `افتح طلبيتك، فيها ${arItems(n)}`),
    },
    hero: {
      eyebrow: "شاورما، صاج ومشاوي عالفحم",
      titleStart: "طالعة سخنة من",
      titleAccent: "عالصاج،",
      titleEnd: "ملفوفة منيح وواصلة لعندك.",
      lede: "شاورما وفلافل ومشاوي عالفحم، منحضّرها طازة كل يوم بالحمرا وجونية. ركّب طلبيتك هون، ابعتها عالواتساب، وخلصنا.",
      orderCta: "اطلب عالواتساب",
      menuCta: "شوف المنيو",
      facts: ["استلام أو توصيل", "الحمرا وجونية", "فاتحين كل يوم من الـ11"],
      imageAlt: "صينية مشاوي مشكّلة مع أسياخ دجاج وكفتة وبطاطا مشوية وصلصات",
      sticker: "السندويش من",
      tagLabel: "الأكتر طلباً",
    },
    branches: {
      eyebrow: "الخطوة 1",
      title: "اختار الفرع",
      lede: "طلبيتك بتروح دغري عالفرع يلي بتختارو. فيك تغيّرو بعدين من السلة.",
      selected: "مختار",
    },
    status: {
      checking: "عم نشيّك عالدوام…",
      open: "فاتحين هلّق",
      closed: "مسكّرين",
      closesAt: (time: string) => (time === "00:00" ? "منسكّر نص الليل" : `منسكّر الساعة ${time}`),
      opensAt: (time: string) => `منفتح الساعة ${time}`,
      daily: "كل يوم",
      range: (open: string, close: string) =>
        close === "00:00" ? `من ${open} لنص الليل` : `من ${open} لـ ${close}`,
    },
    menu: {
      eyebrow: "الخطوة 2",
      title: "المنيو",
      lede: "الأسعار بالدولار. اختار العدد بـ + و −، وبعدين كبوس زيد.",
      categoriesLabel: "أقسام المنيو",
      bestSeller: "الأكتر طلباً",
      add: "زيد",
      added: "انضاف",
      quantity: (name: string) => `العدد من ${name}`,
      decrease: "نقّص العدد",
      increase: "زيد العدد",
      addLabel: (qty: number, name: string) => `زيد ${qty} ${name} عالطلبية`,
      announceAdded: (qty: number, name: string) => `انضاف ${qty} × ${name} عالطلبية`,
    },
    categories: {
      wraps: {
        label: "سندويشات",
        tagline: "بتنلفّ عالطلب بخبز صاج طازة.",
        imageAlt: "نصّين سندويش دجاج مع خضرة وملفوف أحمر",
      },
      plates: {
        label: "صحون",
        tagline: "صحون مليانة، مع كل الإضافات.",
        imageAlt: "أسياخ لحمة مشوية مع بطاطا وبندورة وبصل",
      },
      sides: {
        label: "إضافات",
        tagline: "الشغلات الزغيرة يلي بتكمّل الأكلة.",
        imageAlt: "بطاطا مقلية ذهبية بسلّة",
      },
      drinks: {
        label: "مشروبات",
        tagline: "باردة وبسيطة، ومعمولة للشاورما.",
        imageAlt: "كاسة ليموناضة بالنعنع مع شقف حامض",
      },
      desserts: {
        label: "حلو",
        tagline: "خلّي محل للحلو. أو ما تخلّي، واطلب هيك هيك.",
        imageAlt: "قطعتين بقلاوة بالفستق على صحن أبيض",
      },
    } satisfies Record<CategoryId, CategoryText>,
    items: {
      "chicken-shawarma-wrap": {
        name: "شاورما دجاج",
        desc: "دجاج متبّل عالسيخ مع توم ومخلل وبطاطا، ملفوف منيح بخبز الصاج.",
      },
      "beef-shawarma-wrap": {
        name: "شاورما لحمة",
        desc: "لحمة مشوية عمهل مع طرطور وبقدونس وبصل وبندورة.",
      },
      "falafel-wrap": {
        name: "سندويش فلافل",
        desc: "فلافل مقرمشة مع طحينة ولفت مكبوس وبندورة ونعنع.",
      },
      "halloumi-wrap": {
        name: "سندويش حلومي",
        desc: "حلومي مشوي مع بندورة وخيار وزيتون وشوية نعنع.",
      },
      "spicy-chicken-sajj": {
        name: "صاج دجاج حار",
        desc: "سرّ المحل: دجاج مع دبس فليفلة وتوم وجبنة دايبة، مكبوس عالصاج.",
      },
      "chicken-shawarma-plate": {
        name: "صحن شاورما دجاج",
        desc: "صحن شاورما دجاج كامل مع بطاطا وتوم ومخلل وخبز سخن.",
      },
      "beef-shawarma-plate": {
        name: "صحن شاورما لحمة",
        desc: "شاورما لحمة مع طرطور وحمص وسلطة وخبز.",
      },
      "mixed-grill-plate": {
        name: "صحن مشاوي مشكل",
        desc: "شيش طاووق وكفتة ولحمة مشوية، مع خضرة مشوية وتوم.",
      },
      "falafel-plate": {
        name: "صحن فلافل",
        desc: "ست حبات فلافل مع حمص وطحينة ومخلل وسلطة طازة.",
      },
      "half-grilled-chicken": {
        name: "نصف فروج مشوي",
        desc: "نص فروج عالفحم مع توم وبطاطا ومخلل.",
      },
      fries: {
        name: "بطاطا مقلية",
        desc: "مقرمشة ومملّحة، وجاهزة للتوم.",
      },
      hummus: {
        name: "حمص",
        desc: "حمص ناعم مع طحينة وحامض ورشّة زيت زيتون.",
      },
      tabbouleh: {
        name: "تبولة",
        desc: "بقدونس كتير متل ما لازم تكون، مع برغل وبندورة وحامض.",
      },
      "garlic-toum": {
        name: "توم",
        desc: "توم مخفوق، قوي وخفيف وبيعلّق.",
      },
      pickles: {
        name: "مخلل",
        desc: "لفت وخيار وفليفلة، مكبوسين عنّا بالمحل.",
      },
      ayran: {
        name: "لبن عيران",
        desc: "عيران بارد ومملّح شوي. أحسن رفيق للشاورما.",
      },
      lemonade: {
        name: "عصير ليمون",
        desc: "حامض معصور طازة، محلّى شوي.",
      },
      "mint-lemonade": {
        name: "ليموناضة بالنعنع",
        desc: "ليموناضة طازة مخفوقة مع نعنع وتلج مجروش.",
      },
      "soft-drink": {
        name: "مشروب غازي",
        desc: "كولا، برتقان أو ليمون. بيوصلك بارد.",
      },
      water: {
        name: "مي",
        desc: "مي معدنية، 500 مل.",
      },
      "mini-knefe": {
        name: "كنافة صغيرة",
        desc: "كنافة بالجبن سخنة، مقرمشة من فوق، والقطر عجنب.",
      },
      "baklava-trio": {
        name: "بقلاوة",
        desc: "تلات قطع: فستق وكاجو وجوز.",
      },
      "rice-pudding": {
        name: "رز بحليب",
        desc: "كريمي وبارد، ومزيّن بفستق مطحون.",
      },
      "halawet-el-jibn": {
        name: "حلاوة الجبن",
        desc: "رولات جبنة طرية محشية قشطة، مع قطر بماء الورد.",
      },
      "date-cookie": {
        name: "كوكيز التمر",
        desc: "كوكيز بالزبدة محشية تمر طري.",
      },
    } satisfies Record<ItemId, ItemText>,
    branchInfo: {
      hamra: {
        name: "الحمرا",
        area: "الحمرا، بيروت",
        blurb: "بقلب الحمرا، لعجقة الضهر وللعشا المتأخر.",
      },
      jounieh: {
        name: "جونية",
        area: "جونية، كسروان",
        blurb: "فرعنا عالبحر، بيضل فاتح ساعة زيادة لنص الليل.",
      },
    } satisfies Record<BranchId, BranchText>,
    cart: {
      title: "طلبيتك",
      count: (n: number) => arItems(n),
      close: "سكّر الطلبية",
      empty: "بعد ما في شي هون. المنيو على بعد كبسة.",
      browse: "شوف المنيو",
      remove: (name: string) => `شيل ${name}`,
      quantity: (name: string) => `العدد من ${name}`,
      each: "الواحد",
      orderType: "استلام أو توصيل؟",
      pickup: "استلام",
      delivery: "توصيل",
      branch: "الفرع",
      name: "اسمك",
      namePlaceholder: "لنعرف الطلبية لمين",
      address: "عنوان التوصيل",
      addressPlaceholder: "المنطقة، الشارع، البناية، الطابق",
      notes: "ملاحظات",
      optional: "اختياري",
      notesPlaceholder: "بلا مخلل، توم زيادة، دقّ الجرس مرتين…",
      required: "مطلوب",
      subtotal: "المجموع",
      deliveryFee: "كلفة التوصيل",
      total: "المجموع الكلّي",
      send: "ابعت الطلب عالواتساب",
      needItems: "زيد صنف واحد عالأقل لتبعت الطلبية.",
      needName: "اكتب اسمك لتبعت الطلبية.",
      needAddress: "اكتب عنوان التوصيل لتبعت الطلبية.",
      ready: "رح ينفتح الواتساب والطلبية مكتوبة. ما بيتبعت شي إلا لما تكبس إرسال هونيك.",
    },
    whatsapp: {
      greeting: "مرحبا دار الصاج! بدي طلب:",
      itemLine: (qty: number, name: string, total: string) => `• ${qty}× ${name}: ${total}`,
      subtotal: "المجموع",
      deliveryFee: "كلفة التوصيل",
      total: "المجموع الكلّي",
      type: "نوع الطلب",
      pickup: "استلام من الفرع",
      delivery: "توصيل",
      branch: "الفرع",
      name: "الاسم",
      address: "العنوان",
      notes: "ملاحظات",
    },
    why: {
      eyebrow: "ليش دار الصاج",
      title: "أكل بسيط، معمول عأصولو.",
      blocks: [
        {
          title: "طازة، كل يوم",
          body: "خبز الصاج بينخبز عالطلب، التوم بينخفق كل صبح، وما في شي بيبات للتاني يوم.",
        },
        {
          title: "بيوصلك بسرعة",
          body: "السندويش بيتحضّر بدقايق وبينلفّ منيح ليضل سخن عالطريق.",
        },
        {
          title: "فرعين، نفس الطعمة",
          body: "الحمرا لأهل المدينة، وجونية لأهل البحر. نفس الوصفات ونفس الصاج بالمطبخين.",
        },
      ],
    },
    gallery: {
      eyebrow: "صور",
      title: "جعت؟",
      lede: "لمحة عن يلي بيطلع من مطابخنا.",
      alts: [
        "سندويش شاورما لحمة والبطاطا جوّا",
        "أسياخ دجاج عم تنشوى عالفحم",
        "شاورما دجاج بالخبز مع بطاطا وبقدونس",
        "أصحاب حول طاولة مليانة أكل",
        "صحن فلافل ودجاج مشوي مع سلطة",
        "بطاطا مقلية مقرمشة بسلّة",
      ],
    },
    locations: {
      eyebrow: "الفروع والدوام",
      title: "مرّوا لعنّا",
      lede: "استلموا بنفسكن، أو اطلبوا من أقرب فرع إلكن.",
      hours: "الدوام",
      mapPreview: "معاينة الخريطة",
      mapLabel: (area: string) => `مكان معاينة الخريطة لـ ${area}`,
      orderFrom: (name: string) => `اطلب من فرع ${name}`,
      note: "مشروع تجريبي: ما حطّينا عناوين الشوارع عن قصد.",
    },
    footer: {
      tagline: "شاورما، صاج ومشاوي عالفحم. الحمرا وجونية.",
      fictional: "دار الصاج مطعم خيالي معمول لمعرض أعمال تصميم. الصور من Unsplash.",
      explore: "تصفّح",
      follow: "تابعونا",
      links: { branches: "الفروع", menu: "المنيو", gallery: "صور", locations: "وين نحنا" },
      social: ["إنستغرام", "تيك توك", "فيسبوك"],
      socialSoon: "(الرابط قريباً)",
      credit: "تصميم تجريبي من Mawqe3 Studio",
      rights: "دار الصاج (مطعم خيالي)",
    },
    floating: {
      label: (n: number) =>
        n === 0 ? "افتح طلبيتك عالواتساب" : `افتح طلبيتك عالواتساب، فيها ${arItems(n)}`,
    },
  },
});

export type Dictionary = (typeof translations)["en"];
