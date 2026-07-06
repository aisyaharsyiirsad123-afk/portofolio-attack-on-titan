import { Character, TitanInfo, TimelineEvent, QuizQuestion, MilitaryBranch } from "./types";

export const CHARACTERS: Character[] = [
  {
    id: "eren",
    name: "Eren Yeager",
    jpName: "エレン・イェーガー",
    role: "The Vanguard of Freedom / Main Protagonist",
    division: "Scout Regiment",
    bio: "Born in Shiganshina District, Eren's life was shattered when Wall Maria fell. After witnessing his mother's death, he swore to exterminate all Titans. Upon discovering he possessed the power of the Attack Titan and the complex reality of the outside world, Eren's path diverged into a terrifying march toward absolute freedom, culminating in unleashing the global Rumbling to protect his homeland.",
    stats: {
      combat: 9,
      initiative: 10,
      wits: 7,
      teamwork: 5,
      sacrifice: 10
    },
    quotes: [
      "If you win, you live. If you lose, you die. If you don't fight, you can't win!",
      "I will wipe out every last one of them from this earth!",
      "I am free. No matter what lies ahead, I will keep moving forward.",
      "If someone tries to take my freedom away, I won't hesitate to take theirs."
    ],
    titanForm: "Attack Titan & Founding Titan",
    status: "Active",
    gender: "Male",
    height: "170 cm"
  },
  {
    id: "mikasa",
    name: "Mikasa Ackerman",
    jpName: "ミカサ・アッカーマン",
    role: "Humanity's Strongest Protector",
    division: "Scout Regiment",
    bio: "After her parents were murdered, Mikasa was taken in by the Yeager family. She holds an unbreakable bond with Eren, who gave her a red scarf that she wears constantly. Possessing the awakened genetic combat instincts of the Ackerman bloodline, she graduated top of the 104th Training Corps and is a legendary warrior capable of matching a hundred ordinary soldiers on the battlefield.",
    stats: {
      combat: 10,
      initiative: 8,
      wits: 8,
      teamwork: 6,
      sacrifice: 9
    },
    quotes: [
      "This world is cruel, and it is also very beautiful.",
      "If I can't, then I'll just die. But if I win, I live!",
      "Eren... as long as you're with me, I can do anything.",
      "The world is merciless, but it's also exquisite."
    ],
    status: "Active",
    gender: "Female",
    height: "176 cm"
  },
  {
    id: "armin",
    name: "Armin Arlert",
    jpName: "アルミン・アルレルト",
    role: "The Strategic Beacon of Hope",
    division: "Scout Regiment",
    bio: "Eren and Mikasa's childhood friend, Armin lacked physical strength but possessed an exceptional, genius-level intellect. His tactical assessments saved the Scout Regiment countless times. After inheriting the Colossus Titan during the battle of Shiganshina, he stepped up as Commander, seeking a path of diplomacy and mutual understanding over mindless slaughter.",
    stats: {
      combat: 6,
      initiative: 7,
      wits: 10,
      teamwork: 10,
      sacrifice: 8
    },
    quotes: [
      "People who can't throw something important away, can never hope to change anything.",
      "I want to see the sea!",
      "We have to look past our walls if we ever want to understand the truth.",
      "I don't like the terms 'good person' or 'bad person.' It's impossible to be entirely good to everyone."
    ],
    titanForm: "Colossus Titan",
    status: "Active",
    gender: "Male",
    height: "168 cm"
  },
  {
    id: "levi",
    name: "Levi Ackerman",
    jpName: "リヴァイ・アッカーマン",
    role: "Humanity's Strongest Soldier",
    division: "Scout Regiment",
    bio: "Raised in the Underground District, Levi became an infamous thug before being recruited by Commander Erwin Smith. As Squad Captain of the Special Operations Squad, Levi is legendary for his cold-hearted pragmatism, clean-freak obsession, and devastating combat ability, earning him the title of Humanity's Strongest Soldier.",
    stats: {
      combat: 10,
      initiative: 9,
      wits: 8,
      teamwork: 7,
      sacrifice: 10
    },
    quotes: [
      "The only thing we're allowed to do... is to believe that we won't regret the choice we made.",
      "No casualties. Don't you dare die!",
      "Clean it up. If it's dirty, I can't concentrate.",
      "I choose the option where I have the fewest regrets. That's all I've ever done."
    ],
    status: "Active",
    gender: "Male",
    height: "160 cm"
  },
  {
    id: "erwin",
    name: "Erwin Smith",
    jpName: "エルヴィン・スミス",
    role: "The Visionary 13th Commander",
    division: "Scout Regiment",
    bio: "Erwin was a complex, brilliant leader who resurrected the Scout Regiment's reputation and designed the Long-Distance Scouting Formation. Driven by a childhood desire to prove his father's theory about the outside world correct, Erwin made ruthless sacrifices, ultimately leading a final heroic suicide charge against the Beast Titan in Shiganshina.",
    stats: {
      combat: 9,
      initiative: 10,
      wits: 10,
      teamwork: 8,
      sacrifice: 10
    },
    quotes: [
      "My soldiers, rage! My soldiers, scream! My soldiers, fight!",
      "It is we who give meaning to our comrades' lives!",
      "If we only focus on making the best moves, we will never get the better of our opponent.",
      "What do you see? Who do you think the enemy is?"
    ],
    status: "Deceased",
    gender: "Male",
    height: "188 cm"
  },
  {
    id: "reiner",
    name: "Reiner Braun",
    jpName: "ライナー・ブラウン",
    role: "The Armored Shield of Marley",
    division: "Marley Warrior Unit",
    bio: "A Marleyan Warrior Cadet who inherited the Armored Titan. Infiltrating Paradis, Reiner assumed the role of a dependable, strong brother-figure in the 104th Training Corps. However, the psychological stress of living a dual life fractured his mind, tearing him between his loyalty to Marley and his genuine affection for his Paradis comrades.",
    stats: {
      combat: 9,
      initiative: 8,
      wits: 7,
      teamwork: 8,
      sacrifice: 9
    },
    quotes: [
      "I don't know what's right anymore... But the only choice left for me is to face my consequences as a warrior.",
      "We were just kids... we didn't know anything.",
      "I'm going to finish this once and for all.",
      "I wanted to be a hero. That's why I did what I did."
    ],
    titanForm: "Armored Titan",
    status: "Active",
    gender: "Male",
    height: "185 cm"
  },
  {
    id: "hange",
    name: "Hange Zoë",
    jpName: "ハンジ・ゾエ",
    role: "The Brilliant, Eccentric Commander",
    division: "Scout Regiment",
    bio: "An eccentric researcher who was passionately obsessed with studying Titans. Hange combined wild enthusiasm with high analytical intelligence, developing defensive weapons like the Thunder Spear. Appointed by Erwin as the 14th Commander, Hange guided Paradis through the shocking transition of discovering the outer world.",
    stats: {
      combat: 8,
      initiative: 9,
      wits: 9,
      teamwork: 9,
      sacrifice: 10
    },
    quotes: [
      "Ever since I joined the Survey Corps, there have been things I've seen that make me feel despair... but I still want to know!",
      "Look at him! He is so cute and terrifying!",
      "Titan research is the key to our survival!"
    ],
    status: "Deceased",
    gender: "Female",
    height: "170 cm"
  }
];

export const TITANS: TitanInfo[] = [
  {
    id: "founding",
    name: "Founding Titan",
    jpName: "始祖の巨人 (Shiso no Kyojin)",
    height: 13, // Standard human-form is ~13m, though Karl Fritz and Eren's forms are humongous
    capabilities: [
      "Memory Manipulation",
      "Anatomical Alteration",
      "Telepathic Command over Titans",
      "Control over the Wall Titans"
    ],
    currentHolder: "Eren Yeager",
    previousHolders: ["Uri Reiss", "Frieda Reiss", "Grisha Yeager", "Ymir Fritz"],
    description: "The progenitor of all Titans. It can control the minds of Eldians, alter their biology, and command pure Titans like puppets. However, its full power can only be activated by someone of royal Fritz blood, or by someone in physical contact with a person of royal blood.",
    signatureTrait: "Coordinate Link",
    weakness: "Requires royal blood constraint to activate, susceptible to physical nape destruction if severed."
  },
  {
    id: "attack",
    name: "Attack Titan",
    jpName: "進撃の巨人 (Shingeki no Kyojin)",
    height: 15,
    capabilities: [
      "Future Memory Inheritance",
      "High Combat Agility",
      "Fierce Determination",
      "Hardening (Learned)"
    ],
    currentHolder: "Eren Yeager",
    previousHolders: ["Grisha Yeager", "Eren Kruger"],
    description: "Known as the Titan that has always fought for freedom throughout the generations. Unique among the Nine Titans, it possesses the passive ability to see into the memories of its future inheritors, allowing it to act with eerie foreknowledge and relentless drive.",
    signatureTrait: "Temporal Sight",
    weakness: "Lacks natural built-in armor or projectile capabilities; relies heavily on holder's combat skills."
  },
  {
    id: "colossus",
    name: "Colossus Titan",
    jpName: "超大型巨人 (Chōōgata Kyojin)",
    height: 60,
    capabilities: [
      "Extreme Thermal Explosion on Shift",
      "Pressurized Steam Release",
      "Unmatched Physical Destruction",
      "Atmospheric Heat Generation"
    ],
    currentHolder: "Armin Arlert",
    previousHolders: ["Bertholdt Hoover"],
    description: "Humanity's first nightmare, standing sixty meters tall. Known as the 'God of Destruction,' it can vaporize surrounding areas upon transformation. It can discharge high-pressure superheated steam from its skin, making it impossible for ODM gear users to approach, though this rapidly drains its muscle mass.",
    signatureTrait: "Nuclear Transformation & Steam",
    weakness: "Extremely slow movement speed; massive energy consumption limits active transformation duration."
  },
  {
    id: "armored",
    name: "Armored Titan",
    jpName: "鎧の巨人 (Yoroi no Kyojin)",
    height: 15,
    capabilities: [
      "Hardened Plate Shell Armor",
      "Battering Ram Charge",
      "High Blunt Force Resistance",
      "Armor Shedding for Agility"
    ],
    currentHolder: "Reiner Braun",
    previousHolders: ["Unknown Marley Warriors"],
    description: "Covered by thick hardened segments of skin that act as a permanent, impenetrable natural armor. Capable of charging down fortified brick walls and withstanding standard artillery, it can selectively shed parts of its armor to increase speed in hand-to-hand combat.",
    signatureTrait: "Inbuilt Armor Plates",
    weakness: "Thunder Spears can crack its plates; joint armor is thinner to allow motion."
  },
  {
    id: "female",
    name: "Female Titan",
    jpName: "女型の巨人 (Megata no Kyojin)",
    height: 14,
    capabilities: [
      "Pure Titan Attraction Scream",
      "High Versatility & Adaptability",
      "Localized Selective Hardening",
      "Extreme Running Endurance"
    ],
    currentHolder: "Annie Leonhart",
    previousHolders: ["Unknown Marley Warriors"],
    description: "An exceptionally balanced Titan capable of absorbing and mimicking traits of other Titans. It can harden parts of its body to sharp, diamond-like density and summon pure Titans to its position by screaming, though they will attempt to devour its body once arrived.",
    signatureTrait: "Mimicry & Hardening Scream",
    weakness: "Scream leaves it vulnerable to being eaten; hardening requires active focus."
  },
  {
    id: "beast",
    name: "Beast Titan",
    jpName: "獣の巨人 (Kemono no Kyojin)",
    height: 17,
    capabilities: [
      "Ape-like Proportion throwing reach",
      "Devastating Long-Range Bombardment",
      "Titan Creation (with Zeke's spinal fluid)",
      "Vocal Speech"
    ],
    currentHolder: "Zeke Yeager",
    previousHolders: ["Tom Ksaver"],
    description: "Possesses a distinct animalistic appearance resembling an elongated ape. When wielded by Zeke Yeager (who has royal Fritz blood), it gains the terrifying ability to transform Eldians injected with his spinal fluid into pure Titans and command them under the moonlight.",
    signatureTrait: "Precise Pitch Bombardment",
    weakness: "Weak in close-quarters combat; massive target size makes it vulnerable to fast-moving swordsmen."
  },
  {
    id: "jaw",
    name: "Jaw Titan",
    jpName: "顎の巨人 (Agito no Kyojin)",
    height: 5,
    capabilities: [
      "Crushing Diamond Teeth & Claws",
      "Unparalleled Speed and Acrobatics",
      "Tree & Wall Scaling",
      "Compact Dodging Frame"
    ],
    currentHolder: "Falco Grice",
    previousHolders: ["Porco Galliard", "Ymir", "Marcel Galliard"],
    description: "The smallest but fastest of the Nine Titans. Possesses an exceptionally hard set of jaws and sharp claws capable of crushing even hardened Titan crystal. Its tiny size gives it absolute agility, allowing it to scale vertical forests and bounce off walls seamlessly.",
    signatureTrait: "Indestructible Crushing Jaw",
    weakness: "Lacks armor protection; easily swarmed or subdued if movement is restricted."
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: "wall-maria",
    year: "Year 845",
    title: "Fall of Shiganshina",
    subtitle: "The Day Humanity Remembered",
    description: "The Colossus and Armored Titans breached the gates of Shiganshina and Wall Maria, ending a century of peaceful confinement. One-third of humanity's territory was lost, and Eren Yeager witnessed his mother being devoured, forging his path of vengeance.",
    significantDeath: "Carla Yeager",
    battleOutcome: "Catastrophic defeat; retreat to Wall Rose.",
    category: "Walls"
  },
  {
    id: "trost-district",
    year: "Year 850",
    title: "Battle of Trost District",
    subtitle: "First Victory for Humanity",
    description: "The Colossus Titan reappeared, destroying the outer gate of Trost. Amidst chaos, Eren discovered his Titan-shifting ability. Using his rogue power, Armin formulated a strategy to plug the breach using a giant boulder, marking humanity's first successful defense against the Titans.",
    battleOutcome: "Breach plugged; Eren placed under Scout custody.",
    category: "Walls"
  },
  {
    id: "female-titan",
    year: "Year 850",
    title: "57th Expedition Outside the Walls",
    subtitle: "Infiltration of the Female Titan",
    description: "The Scout Regiment set off to reach Shiganshina, only to be ambushed by an intelligent Female Titan in the Giant Forest. Commander Erwin trapped her, but she escaped. Later, Armin deduced her identity as Annie Leonhart, leading to a destructive clash inside Wall Sina's Stohess District.",
    significantDeath: "Levi's Special Operations Squad",
    battleOutcome: "Annie Leonhart captured in a self-hardened crystal.",
    category: "Expedition"
  },
  {
    id: "shiganshina-clash",
    year: "Year 850",
    title: "Return to Shiganshina",
    subtitle: "The Basement Secret Unlocked",
    description: "A high-stakes campaign to reclaim Wall Maria. The Scouts fought the Beast, Armored, and Colossus Titans. Commander Erwin led a suicide charge to distract the Beast, allowing Levi to defeat him. Armin inherited the Colossus Titan. Eren reached his cellar, discovering that humanity thrives outside Paradis and considers Eldians 'devils.'",
    significantDeath: "Erwin Smith, Bertholdt Hoover",
    battleOutcome: "Wall Maria reclaimed. Only 9 Scouts survived.",
    category: "Infiltration"
  },
  {
    id: "marley-raid",
    year: "Year 854",
    title: "Raid on Liberio",
    subtitle: "Declaration of War Counter-Strike",
    description: "Eren infiltrated Marley and launched a devastating surprise attack on Liberio just as Willy Tybur declared war on Paradis. The Scouts assisted Eren, stealing the War Hammer Titan and escaping, but cementing Paradis' status as a global threat.",
    significantDeath: "Sasha Blouse",
    battleOutcome: "War Hammer Titan captured; global forces unify against Paradis.",
    category: "Marley"
  },
  {
    id: "rumbling",
    year: "Year 854",
    title: "The Rumbling Unleashed",
    subtitle: "The Ultimate Judgement",
    description: "Eren bypassed the royal blood seal by convincing the founder Ymir to grant him her power. He hardened himself, broke all three massive circular Walls, and mobilized millions of Colossus Titans to trample the earth to ash, seeking to erase all enemies of Paradis.",
    battleOutcome: "Global devastation commenced; Alliance formed to stop Eren.",
    category: "Rumbling"
  }
];

export const MILITARY_BRANCHES: MilitaryBranch[] = [
  {
    id: "scouts",
    name: "Scout Regiment (Survey Corps)",
    motto: "Shinzo wo Sasageyo!",
    mottoTranslation: "Dedicate your hearts!",
    description: "The vanguard of humanity's expansion. They actively venture outside the safety of the walls to study Titans, map territory, and fight to reclaim lost lands. They suffer the highest casualty rates but possess the absolute best combat elites and tactical minds.",
    insigniaDescription: "The 'Wings of Freedom' - overlapping blue and white bird wings representing the hope of flight over confinement.",
    primaryDuties: [
      "Expedition outside the walls",
      "Titan research and capture",
      "Establishing supply routes",
      "Spearheading Paradis defense operations"
    ],
    iconName: "Compass"
  },
  {
    id: "garrison",
    name: "Garrison Regiment",
    motto: "For the Order and Safety of the Walls",
    mottoTranslation: "Untuk ketertiban dan keselamatan tembok",
    description: "The largest branch of the military, responsible for maintaining and defending the massive stone walls. They patrol the battlements, deploy wall-mounted heavy cannons, evacuate citizens during emergencies, and stand as the primary defensive shield if a wall is breached.",
    insigniaDescription: "Two red roses crossed over a shield, representing the delicate beauty of life protected within fortified thorns.",
    primaryDuties: [
      "Wall maintenance and fortification",
      "Heavy defensive artillery operation",
      "Civil evacuation and crowd control",
      "Patrolling residential outer districts"
    ],
    iconName: "Shield"
  },
  {
    id: "police",
    name: "Military Police Brigade",
    motto: "Under the Majesty of the King",
    mottoTranslation: "Di bawah keagungan Raja",
    description: "The elite internal security force operating exclusively in the innermost Wall Sina. Only the top 10 graduates of each training cycle are allowed to join. They enjoy a safe, comfortable life, managing taxes, land distribution, and domestic law enforcement, though corruption is rampant.",
    insigniaDescription: "A green unicorn head on a white shield, symbolizing noble protection and sovereign royal authority.",
    primaryDuties: [
      "Royal family bodyguard duty",
      "Domestic law enforcement & tax collection",
      "Counter-insurgency and speech censorship",
      "Supervising the Garrison and Scout branches"
    ],
    iconName: "Crown"
  },
  {
    id: "warriors",
    name: "Marleyan Warrior Unit",
    motto: "To Honor the Marleyan Empire",
    mottoTranslation: "Menghormati Kekaisaran Marley",
    description: "An elite military division composed of Eldian children recruited inside Liberio internment zones. They are rigorously trained and brainwashed to earn honorary Marleyan citizenship by inheriting one of the powerful Titan powers, then deployed globally as living weapons.",
    insigniaDescription: "A golden Eldian star with a Marleyan crest, representing the binding duty and heavy honor of the Chosen Warriors.",
    primaryDuties: [
      "Wielding the Nine Titans on international battlefronts",
      "Infiltrating enemy sovereign nations",
      "Recovering the Founding Titan from Paradis Island",
      "Enforcing colonial imperial directives"
    ],
    iconName: "Swords"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Ketika tembok pembatas kota tiba-tiba jebol dan Titan mulai masuk, apa reaksi pertamamu?",
    options: [
      {
        text: "Langsung mengambil peralatan ODM dan menyerang titan di baris terdepan untuk menyelamatkan warga.",
        scores: { scouts: 4, garrison: 1, police: 0, warriors: 2 }
      },
      {
        text: "Mempersiapkan meriam di atas tembok dan mengarahkan warga ke zona evakuasi teraman secara tertib.",
        scores: { scouts: 1, garrison: 4, police: 1, warriors: 0 }
      },
      {
        text: "Mengamankan keluarga kerajaan dan dokumen penting di distrik dalam sebelum kekacauan menyebar.",
        scores: { scouts: 0, garrison: 1, police: 4, warriors: 0 }
      },
      {
        text: "Melihat ini sebagai kesempatan taktis untuk menyusup ke kepanikan musuh demi menyelesaikan misi rahasia.",
        scores: { scouts: 1, garrison: 0, police: 0, warriors: 4 }
      }
    ]
  },
  {
    id: 2,
    text: "Apa filosofi hidup yang paling menggambarkan dirimu?",
    options: [
      {
        text: "Kebebasan adalah hak lahir kita. Menyerah pada batas adalah kematian yang sebenarnya.",
        scores: { scouts: 4, garrison: 0, police: 0, warriors: 2 }
      },
      {
        text: "Kedamaian sejati ada dalam ketertiban, rutinitas yang stabil, dan melindungi apa yang ada di depan mata.",
        scores: { scouts: 0, garrison: 4, police: 1, warriors: 1 }
      },
      {
        text: "Kenyamanan dan keamanan pribadi adalah hal logis. Tidak ada gunanya mati konyol untuk idealisme.",
        scores: { scouts: 0, garrison: 1, police: 4, warriors: 0 }
      },
      {
        text: "Melayani tanah air dan membuktikan kehormatan keluarga, meski harus mengorbankan perasaan pribadi.",
        scores: { scouts: 1, garrison: 0, police: 0, warriors: 4 }
      }
    ]
  },
  {
    id: 3,
    text: "Dalam pertempuran sengit, rekan setimmu terkepung oleh tiga Titan. Apa keputusanmu?",
    options: [
      {
        text: "Menyerang membabi buta sendirian. Saya percaya pada kemampuan pedang saya untuk menebas tengkuk mereka semua!",
        scores: { scouts: 3, garrison: 1, police: 0, warriors: 2 }
      },
      {
        text: "Membuat perangkap taktis menggunakan gas ODM untuk memancing Titan menjauh, memprioritaskan keselamatan rekan.",
        scores: { scouts: 4, garrison: 2, police: 1, warriors: 1 }
      },
      {
        text: "Menembakkan suar darurat dan mundur untuk meminta bantuan unit artileri berat Garrison.",
        scores: { scouts: 1, garrison: 4, police: 1, warriors: 0 }
      },
      {
        text: "Menganalisis situasi dingin. Jika peluang bertahan hidup mereka di bawah 10%, fokus mengamankan tujuan utama misi.",
        scores: { scouts: 1, garrison: 0, police: 1, warriors: 4 }
      }
    ]
  },
  {
    id: 4,
    text: "Bagaimana caramu menghabiskan waktu luang setelah seharian berlatih keras?",
    options: [
      {
        text: "Membersihkan peralatan ODM, mengasah bilah pedang, dan berdiskusi taktik ekspedisi berikutnya.",
        scores: { scouts: 4, garrison: 1, police: 0, warriors: 2 }
      },
      {
        text: "Menikmati segelas minuman hangat bersama teman-teman sambil bercengkerama santai di kedai lokal.",
        scores: { scouts: 1, garrison: 4, police: 2, warriors: 0 }
      },
      {
        text: "Bersantai di penginapan mewah, menikmati makanan enak, dan menghindari pekerjaan berat.",
        scores: { scouts: 0, garrison: 1, police: 4, warriors: 0 }
      },
      {
        text: "Melakukan latihan fisik tambahan sendirian dan merenungkan misi rahasia yang dibebankan padaku.",
        scores: { scouts: 1, garrison: 0, police: 0, warriors: 4 }
      }
    ]
  },
  {
    id: 5,
    text: "Jika kamu diberikan kekuatan salah satu dari Sembilan Titan, untuk apa kamu menggunakannya?",
    options: [
      {
        text: "Menghancurkan tembok-tembok penindasan dan merebut kebebasan mutlak bagi seluruh ras saya.",
        scores: { scouts: 4, garrison: 0, police: 0, warriors: 2 }
      },
      {
        text: "Menjadi perisai kokoh untuk mempertahankan wilayah kota dan mengevakuasi jutaan nyawa.",
        scores: { scouts: 1, garrison: 4, police: 1, warriors: 1 }
      },
      {
        text: "Mengontrol keamanan dalam kota dari balik layar, membasmi kejahatan rahasia.",
        scores: { scouts: 0, garrison: 1, police: 4, warriors: 1 }
      },
      {
        text: "Melaksanakan perintah komando militer tertinggi demi menghentikan ancaman global.",
        scores: { scouts: 1, garrison: 0, police: 0, warriors: 4 }
      }
    ]
  }
];
