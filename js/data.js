const menuData = {
  frittura: [
    { name: "Patatine",              price: "€3.50", image: "assets/img_fries.jpg" },
    { name: "Sticks mozzarella ",  price: "€4.50", image: "assets/img_mozzarella.jpg" },
    { name: "Nuggets ",            price: "€4.50", image: "assets/img_nuggets.png" },
    { name: "Falafel ",            price: "€4.00", image: "assets/img_falafel.jpg" },
    { name: "Mozzarelline pan.",     price: "€4.50", image: "assets/img_olive.jpg" },
    { name: "Anelli di cipolla ",  price: "€3.50", image: "assets/img_onionrings.jpg" },
    { name: "Alette di pollo ",    price: "€5.00", image: "assets/img_wings.jpg" },
    { name: "twister",           price: "€4.50", image: "assets/img_jalapeno.jpg" },
    { name: "Crochette di patate  ",  price: "€3.50", image: "assets/img_onionrings.jpg" },
    { name: "Samosa",    price: "€3.50", image: "assets/img_wings.jpg" },
    { name: "Bocconcini Philadelphia ",   price: "€5.00", image: "assets/img_jalapeno.jpg" },
    { name: "Brik",           price: "€2.50", image: "assets/img_jalapeno.jpg" },
   { name: "Mix frittura",         price: "€12.00", image: "assets/img_mixfrittura.jpg" }
  ],

  aggiunte: [
    { name: "Lattuga, pomodoro, cipolla, cavolo cappuccio", norm: "€0.50", maxi: "€0.80" },
    { name: "Mozzarella, Emmental, Provola aff., Funghi dolci, Funghi picc., Formaggio inglese, Patatine fritte, Patatine al forno, Insalata araba, Insalata mechwiya, Cipolla cotta", norm: "€1.50", maxi: "€2.00" },
    { name: "Carne Macinata, Nuggets, Mergez, Kebab, Chicken, Steak, Cotoletta, Carne di Cavallo", norm: "€1.50", maxi: "€3.00" }
  ],
  salsePrice: "€0.40",
  salse: [
    "Algerienne", "Andalouse", "Samurai", "Brazil", "Barbecue",
    "Chibiloute", "Hot Pili Pili", "Hannibal",
    "Maionese", "Ketchup", "Marocaine",
    "Pitakebab", "Curry", "Burger",
    "Tunisina", "Rosa", "Arissa",
    "Tabasco", "Thai Chili", "Senape",
    "Chiboulette"
  ],
  bibite: [
    { name: "Coca cola, Fanta, Sprite, The limone/pesca", price: "€2.50" },
    { name: "Coca cola, Coca cola zero, Sprite, Fanta, Lemonsoda, Acqua tonica, Fanta lemon, Chinotto", price: "€2.00" },
    { name: "RedBull, Monster", price: "€3.50" },
    { name: "Coca cola 1 L", price: "€3.50" },
    { name: "Moretti zero, Heineken zero, Becks zero", price: "€3.00" },
    { name: "Acqua naturale/frizzante", price: "€1.00" }
  ],
  chocoKebab: [
    { name: "Choco kebab", price: "€4.00", description: "Topping: Nocciola, Fragola, Caramello, Vaniglia, Frutti di bosco, Cioccolato, Caffè. Granelle: Noccioline, Pistacchio, Cocco, Mandorle", image: "assets/choco.png" },
    { name: "Choco speciale", price: "€4.50", description: "Nutella e panna / Nutella e cioccolato bianco", image: "assets/choco_speciale.png" },
    { name: "Choco super speciale", price: "€5.00", description: "Nutella panna e cioccolato bianco", image: "assets/choco_super.png" }
  ],
  kebabVaschetta: {
    prices: { small: "€3.50", norm: "€5.00", maxi: "€6.50" }
  },
  kebab: [
    { name: "El Mayor", norm: "€5.00", maxi: "€7.00", description: "Kebab, Cavolo cappuccio, Patatine, Salsa greca, Insalata michiwia (Peperoni, Pomodoro, Cipolla, Aglio arrosto)" },
    { name: "Har", norm: "€5.00", maxi: "€7.00", description: "Kebab, Lattuga, Cipolla, Salsa greca, Arissa" },
    { name: "Aadi", norm: "€5.00", maxi: "€7.00", description: "Kebab, Mozzarella, Patatine, Salsa barbecue" },
    { name: "Elys", norm: "€6.50", maxi: "€8.00", description: "Kebab, Mozzarella, Emmental, Cheddar, Provola aff.," },
    { name: "Jana", norm: "€5.00", maxi: "€7.00", description: "Kebab, Cavolo, Insalata, Arissa" },
    { name: "Ayhem", norm: "€5.00", maxi: "€7.00", description: "Kebab, Patatine, Ketchup, Maionese" },
    { name: "Maya", norm: "€5.00", maxi: "€7.00", description: "Kebab, Insalata verde, Salsa greca" },
    { name: "Completo", norm: "€6.50", maxi: "8.00", description: "Kebab, Patatine, Insalata michwiya, Lattuga, Cavolo cappuccio, Arissa, Salsa greca, Insalata araba (Cetrioli, Pomodoro, Cipolla, Menta)" }
  ],
  frenchTacos: {
    baseIngredients: "Mozzarella, Cheddar, Patatine, Salsa a scelta",
    meatOptions: "Nuggets, Mergez, Kebab, Chicken, Cotoletta, Carne di Cavallo",
    sizes: [
      { name: "M (1 tipo di carne)", singolo: "€7.00", },
      { name: "L (2 tipi di carne)", singolo: "€9.00",  },
      { name: "XL (3 tipi di carne)", singolo: "€12.00",  }
    ]
  },
  menuBambini: [
    { name: "Chicken",  description: "Cotoletta, Maionese, Lattuga",              singolo: "€4.50", menu: "€6.50" },
    { name: "Burger",   description: "Burger, Lattuga, Maionese",                  singolo: "€4.50", menu: "€6.50" },
    { name: "Veggy",    description: "Falafel, Lattuga, Maionese",                 singolo: "€4.50", menu: "€6.50" },
    { name: "Fish",     description: "Cotoletta di merluzzo, Lattuga, Maionese",   singolo: "€4.50", menu: "€6.50" },
    { name: "Hot-Dog",  description: "Wurstel, Ketchup, Maionese",                 singolo: "€4.00", menu: "€6.00" }
  ],
  paneArabo: [
    { name: "Kebab", description: "Kebab, Lattuga, Salse a scelto", price: "€5.00" },
    { name: "Cotoletta", description: "Cotoletta, Lattuga, Cipolla croccante, Salse a scelta", price: "€5.00" },
    { name: "Mergez", description: "Salsiccia, Lattuga, Cipolla croccante, Salse a scelta", price: "€5.00" },
    { name: "Chiken", description: "Petto di pollo, Lattuga, Salse a scelta", price: "€5.00" }
  ],
  panini: [
    { name: "Cavallo", description: "Carne di cavallo, Lattuga, Cipolla, Emmental, Patatine, Ketchup, Maionese", price: "€8.00" },
    { name: "Petto di pollo", description: "Petto di pollo, Lattuga, Sottilette, Patatine, Ketchup, Maionese", price: "€8.00" },
    { name: "Salsiccia", description: "Salsiccia, Insalata araba, Lattuga, Arissa, Patatine", price: "€8.00" },
    { name: "Hamburger", description: "Hamburger, Lattuga, Form. inglese, Patatine, Ketchup, Maionese", price: "€8.00" },
    { name: "Wurstel", description: "Wurstel, Mozzarella, Patatine, Ketchup, Maionese", price: "€5.50" },
    { name: "Croccantes", description: "Pollo croccante, provola dolce, patatine, ketchup, maionese, cipolla croccante", price: "€8.00" },
    { name: "Cotoletta", description: "Cotoletta di pollo, Provola aff., Patatine, Ketchup, Maionese", price: "€8.00" }
  ],
  cousCous: [
    { name: "Verdure", price: "€7.00" },
    { name: "Pollo e verdure", price: "€8.00" },
    { name: "Carne bovina", price: "€8.00" },
    { name: "Agnello", price: "€10.00" },
    { name: "Pesce (frutti di mare misti)", price: "€11.00" },
    { name: "Fritto misto", price: "€13.90" }
  ],
  vegetariano: [
    { name: "El Mayor Veggy", description: "Falafel, Cavolo cappuccio, Patatine, Insalata michwiya", norm: "€5.00", maxi: "€7.00" },
    { name: "Caprese", description: "Mozzarella, Pomodoro, Lattuga, Origano, Olio", norm: "€4.50", maxi: "€6.50" },
    { name: "Veggy", description: "Lattuga, Pomodoro, Mozzarella, Patatine, Ketchup, Maionese", norm: "€5.00", maxi: "€7.00" }
  ],
  piatti: [
    { name: "Kebab", price: "€8.50", image: "assets/piatti_kebab.png" },
    { name: "Wings", price: "€8.50", image: "assets/piatti_wings.png" },
    { name: "Mergez", price: "€9.00", image: "assets/piatti_mergez.png" },
    { name: "Mix Carne", description: "(Kebab, Wings, Mergez, Agnello, Patatine, Insalata)", price: "€16.50", image: "assets/piatti_mix.png" }
  ]
};
