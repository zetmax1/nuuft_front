// Universitet tuzilmasi ma'lumotlari
export const universityStructure = {
    // Yuqori boshqaruv
    topManagement: [
        {
            id: 'otm-kengashi',
            title: 'OTM kengashi',
            type: 'council',
            level: 1,
            position: { x: 0.5, y: 0 },
            description: "OTM kengashi universitetning oliy boshqaruv organi bo'lib, strategik qarorlar qabul qilish va rivojlanish rejalarini tasdiqlash bilan shug'unaladi.",
            head: {
                name: "Turaev Shavkat",
                title: "Kengash raisi",
                email: "director@jbnuu.uz"
            },
            tasks: [
                "Universitet rivojlanish strategiyasini belgilash",
                "O'quv va ilmiy faoliyat bo'yicha yillik hisobotlarni ko'rib chiqish",
                "Ichki tartib-qoidalarni tasdiqlash"
            ]
        },
        {
            id: 'direktor',
            title: 'Direktor',
            type: 'leadership',
            level: 1,
            position: { x: 2, y: 0 },
            description: "Filial direktori - universitetni boshqaruvchi oliy mansabdor shaxs. U barcha o'quv, ilmiy va moliyaviy jarayonlar uchun mas'uldir.",
            head: {
                name: "Turaev Shavkat",
                title: "Filial direktori, professor",
                phone: "+998 72 226-00-11",
                email: "director@jbnuu.uz"
            },
            staff: [
                { name: "Sattorov Alijon", title: "Yordamchi", email: "a.sattorov@jbnuu.uz" },
                { name: "Odilova Nigora", title: "Kotiba", email: "n.odilova@jbnuu.uz" }
            ],
            tasks: [
                "Filial faoliyatiga umumiy rahbarlik qilish",
                "Xalqaro hamkorlik aloqalarini o'rnatish",
                "Moliyaviy va kadrlar siyosatini yuritish"
            ]
        },
        {
            id: 'jamoatchilik-kengashi',
            title: 'Jamoatchilik kengashi',
            type: 'council',
            level: 1,
            position: { x: 3.5, y: 0 },
            dashed: true,
            description: "Jamoatchilik kengashi - tashqi nazorat va universitet faoliyatining shaffofligini ta'minlovchi maslahat organi.",
            head: {
                name: "Karimjonov Akmal",
                title: "Kengash raisi",
                email: "a.karimjonov@jbnuu.uz"
            }
        }
    ],

    // Direktor o'rinbosarlari va ularning tarmoqlari
    branches: [
        {
            id: 'yoshlar-masalalari',
            title: "Yoshlar masalalari va ma'naviy ishlar bo'yicha direktorning birinchi o'rinbosari",
            type: 'vice-director',
            level: 2,
            position: { x: 0, y: 1.5 },
            parentId: 'direktor',
            description: "Talabalar bilan ishlash, ma'naviy-ma'rifiy tarbiya va ijtimoiy muhit barqarorligini ta'minlash yo'nalishiga rahbarlik qiladi.",
            tasks: [
                "Ma'naviy-ma'rifiy tadbirlarni rejalashtirish",
                "Talabalar turar joylaridagi sharoitlarni nazorat qilish",
                "Yoshlar bilan ishlash tizimini muvofiqlashtirish"
            ],
            head: {
                name: "Nurmatov Sanjar",
                title: "Direktor o'rinbosari",
                email: "s.nurmatov@jbnuu.uz"
            },
            staff: [
                { name: "Boltayev Erkin", title: "Uslubchi", email: "e.boltayev@jbnuu.uz" },
                { name: "Yusupova Feruza", title: "Katta mutaxassis", email: "f.yusupova@jbnuu.uz" }
            ]
        },
        {
            id: 'oquv-ishlari',
            title: "O'quv ishlari bo'yicha direktor o'rinbosari",
            type: 'vice-director',
            level: 2,
            position: { x: 1, y: 1.5 },
            parentId: 'direktor',
            description: "O'quv jarayonini rejalashtirish, sifatli ta'lim berish va kredit-modul tizimini joriy etish uchun mas'ul.",
            head: {
                name: "Karimov Ulug'bek",
                title: "Direktor o'rinbosari, dotsent",
                phone: "+998 72 226-00-22",
                email: "u.karimov@jbnuu.uz"
            },
            staff: [
                { name: "Xalilov Rustam", title: "O'quv bo'limi inspektori", email: "r.xalilov@jbnuu.uz" },
                { name: "Murodova Sayyora", title: "Metodist", email: "s.murodova@jbnuu.uz" }
            ],
            tasks: [
                "O'quv rejalarini shakllantirish",
                "Dars jadvallarini tasdiqlash",
                "Talabalar o'zlashtirish monitoringini olib borish"
            ]
        },
        {
            id: 'ilmiy-ishlar',
            title: "Ilmiy ishlar va innovatsiyalar bo'yicha direktor o'rinbosari",
            type: 'vice-director',
            level: 2,
            position: { x: 2, y: 1.5 },
            parentId: 'direktor',
            description: "Ilmiy-tadqiqot ishlari, tayanch doktorantura va innovatsion texnologiyalarni amaliyotga tatbiq etish yo'nalishiga rahbarlik qiladi.",
            head: {
                name: "Sultonov Mansur",
                title: "Direktor o'rinbosari, fan nomzodi",
                email: "m.sultonov@jbnuu.uz"
            },
            staff: [
                { name: "Qodirov Baxtiyor", title: "Ilmiy kotib", email: "b.qodirov@jbnuu.uz" },
                { name: "Ergasheva Lobar", title: "Innovatsiyalar bo'yicha mutaxassis", email: "l.ergasheva@jbnuu.uz" }
            ]
        }
    ],

    // Bo'limlar va markazlar
    departments: [
        // Yoshlar masalalari ostidagi bo'limlar
        {
            id: 'yoshlar-bilim',
            title: "Yoshlar bilan ishlash, ma'naviyat va ma'rifat bo'limi",
            type: 'department',
            level: 3,
            position: { x: 0, y: 2.5 },
            parentId: 'yoshlar-masalalari',
            head: { name: "Azimov Sardor", title: "Bo'lim boshlig'i", email: "s.azimov@jbnuu.uz" },
            staff: [
                { name: "Eshonqulov Mirshod", title: "Metodist", email: "m.eshonqulov@jbnuu.uz" },
                { name: "Jo'rayeva Guli", title: "Psixolog", email: "g.jorayeva@jbnuu.uz" }
            ]
        },

        // O'quv ishlari ostidagi bo'limlar
        {
            id: 'oquv-uslubiy',
            title: "O'quv uslubiy boshqarma",
            type: 'department',
            level: 3,
            position: { x: 1, y: 2.5 },
            parentId: 'oquv-ishlari',
            description: "O'quv uslubiy boshqarma - filialdagi o'quv jarayonini metodik jihatdan ta'minlash va nazorat qilishning asosiy bo'g'inidir.",
            head: { name: "Usmonov Jamshid", title: "Boshqarma boshlig'i", email: "j.usmonov@jbnuu.uz" },
            tasks: [
                "O'quv yuklamalarini taqsimlash",
                "Hemis tizimi bilan ishlash",
                "Syllabus va ishchi fan dasturlarini ekspertizadan o'tkazish"
            ],
            staff: [
                {
                    name: "Abduvaliyev Sherzod",
                    title: "Bosh mutaxassis",
                    email: "sh.abduvaliyev@jbnuu.uz"
                },
                {
                    name: "Raxmonova Dilnoza",
                    title: "Yetakchi mutaxassis",
                    email: "d.raxmonova@jbnuu.uz"
                },
                {
                    name: "Toshpo'latov Aziz",
                    title: "Metodist",
                    email: "a.toshpulatov@jbnuu.uz"
                }
            ]
        },
        {
            id: 'raqamli-tahlim',
            title: "Raqamli ta'lim texnologiyalari markazi",
            type: 'center',
            level: 3,
            position: { x: 1, y: 3.5 },
            parentId: 'oquv-ishlari',
            head: { name: "Ibragimov Doniyor", title: "Markaz direktori", email: "d.ibragimov@jbnuu.uz" },
            staff: [
                {
                    name: "G'ulomov Shoxrux",
                    title: "Tizim ma'muri",
                    email: "sh.gulomov@jbnuu.uz"
                },
                {
                    name: "Ismoilov Jalol",
                    title: "Dasturchi",
                    email: "j.ismoilov@jbnuu.uz"
                },
                {
                    name: "Xurramov Elbek",
                    title: "Tarmoq muhandisi",
                    email: "e.xurramov@jbnuu.uz"
                }
            ]
        },
        {
            id: 'axborot-resurs',
            title: 'Axborot resurs markazi',
            type: 'center',
            level: 3,
            position: { x: 1, y: 4.5 },
            parentId: 'oquv-ishlari',
            head: { name: "Mamadiyorova Gulchehra", title: "Markaz rahbari", email: "g.mamadiyorova@jbnuu.uz" },
            staff: [
                {
                    name: "Aliyeva Malika",
                    title: "Kutubxonachi",
                    email: "m.aliyeva@jbnuu.uz"
                },
                {
                    name: "Karimova Ziyoda",
                    title: "Arxivchi",
                    email: "z.karimova@jbnuu.uz"
                },
                {
                    name: "Yo'ldoshev Timur",
                    title: "Elektron kutubxona mutaxassisi",
                    email: "t.yoldoshev@jbnuu.uz"
                }
            ]
        },

        // Ilmiy ishlar ostidagi bo'limlar
        {
            id: 'ilmiy-tadqiqotlar',
            title: "Ilmiy tadqiqotlar, innovatsiyalar va ilmiy-pedagogik kadrlar tayyorlash bo'limi",
            type: 'department',
            level: 3,
            position: { x: 2, y: 2.5 },
            parentId: 'ilmiy-ishlar',
            head: { name: "Boymurodov Ulug'bek", title: "Bo'lim boshlig'i", email: "u.boymurodov@jbnuu.uz" },
            staff: [
                {
                    name: "Xaydarov Javlon",
                    title: "Bosh mutaxassis",
                    email: "j.xaydarov@jbnuu.uz"
                },
                {
                    name: "Normatov Oybek",
                    title: "Yetakchi mutaxassis",
                    email: "o.normatov@jbnuu.uz"
                }
            ]
        },
        {
            id: 'iqtidorli-talabalar',
            title: "Iqtidorli talabalarning ilmiy-tadqiqot faoliyatini tashkil etish bo'limi",
            type: 'department',
            level: 3,
            position: { x: 2, y: 3.5 },
            parentId: 'ilmiy-ishlar',
            head: { name: "Sodiqov Farhod", title: "Bo'lim boshlig'i", email: "f.sodiqov@jbnuu.uz" },
            staff: [
                { name: "Kamalova Shohida", title: "Metodist", email: "sh.kamalova@jbnuu.uz" }
            ]
        },
        {
            id: 'ilmiy-innovatsiya',
            title: 'Ilmiy-innovatsiya ishlab chiqarish markazi',
            type: 'center',
            level: 3,
            position: { x: 2, y: 4.5 },
            parentId: 'ilmiy-ishlar',
            head: { name: "Rahmatov Bobur", title: "Direktor", email: "b.rahmatov@jbnuu.uz" },
            staff: [
                { name: "Sobirov Azamat", title: "Loyiha menejeri", email: "a.sobirov@jbnuu.uz" },
                { name: "Tursunov Jamol", title: "Muhandis", email: "j.tursunov@jbnuu.uz" }
            ]
        }
    ],

    // To'g'ridan-to'g'ri bo'ysunuvchi bo'limlar (Vertical list 1)
    centralUnits: [
        {
            id: 'reja-moliya',
            title: "Reja moliya bo'limi",
            type: 'department',
            level: 2,
            position: { x: 3, y: 1.5 },
            parentId: 'direktor',
            head: { name: "Nazarov Xayrulla", title: "Bo'lim boshlig'i", email: "x.nazarov@jbnuu.uz" },
            staff: [
                {
                    name: "Sobirov O'tkir",
                    title: "Iqtisodchi",
                    email: "o.sobirov@jbnuu.uz"
                },
                {
                    name: "Isayeva Nargiza",
                    title: "Hisobchi",
                    email: "n.isayeva@jbnuu.uz"
                }
            ]
        },
        {
            id: 'buxgalteriya',
            title: 'Buxgalteriya',
            type: 'service',
            level: 2,
            position: { x: 3, y: 2.2 },
            parentId: 'direktor',
            head: { name: "Abidov Anvar", title: "Bosh hisobchi", email: "a.abidov@jbnuu.uz" },
            staff: [
                { name: "Soliyeva Umida", title: "Hisobchi", email: "u.soliyeva@jbnuu.uz" },
                { name: "Mamajonov Bekzod", title: "Kassir", email: "b.mamajonov@jbnuu.uz" }
            ]
        },
        {
            id: 'bosh-auditor',
            title: 'Bosh auditor',
            type: 'service',
            level: 2,
            position: { x: 3, y: 2.9 },
            parentId: 'direktor',
            head: { name: "Xalilov Ikrom", title: "Bosh auditor", email: "i.xalilov@jbnuu.uz" }
        },
        {
            id: 'ishlar-boshqarmasi',
            title: 'Ishlar boshqarmasi',
            type: 'service',
            level: 2,
            position: { x: 3, y: 3.6 },
            parentId: 'direktor',
            head: { name: "Saidov Rustam", title: "Boshqarman boshlig'i", email: "r.saidov@jbnuu.uz" },
            staff: [
                { name: "Yo'ldoshev Ahror", title: "Omborchi", email: "a.yoldoshev@jbnuu.uz" }
            ]
        },
        {
            id: 'texnik-foydalanish',
            title: "Texnik foydalanish va xo'jalik bo'limi",
            type: 'service',
            level: 2,
            position: { x: 3, y: 4.3 },
            parentId: 'direktor',
            head: { name: "Ortiqov Botir", title: "Bo'lim boshlig'i", email: "b.ortiqov@jbnuu.uz" },
            staff: [
                { name: "Qobilov Laziz", title: "Komendant", email: "l.qobilov@jbnuu.uz" },
                { name: "Hasanov O'ktam", title: "Usta", email: "o.hasanov@jbnuu.uz" }
            ]
        },
        {
            id: 'fuqaro-mehnat',
            title: "Fuqaro va mehnat muhofazasi bo'limi",
            type: 'service',
            level: 2,
            position: { x: 3, y: 5.0 },
            parentId: 'direktor',
            head: { name: "G'afforov Alisher", title: "Texnika xavfsizligi muhandisi", email: "a.gafforov@jbnuu.uz" }
        },
        {
            id: 'oqutishning-texnik',
            title: "O'qitishning texnik vositalari bo'limi",
            type: 'service',
            level: 2,
            position: { x: 3, y: 5.7 },
            parentId: 'direktor',
            head: { name: "Mirzayev Elyor", title: "Bo'lim boshlig'i", email: "e.mirzayev@jbnuu.uz" },
            staff: [
                { name: "Saidov Bunyod", title: "Texnik muhandis", email: "b.saidov@jbnuu.uz" }
            ]
        }
    ],

    // To'g'ridan-to'g'ri bo'ysunuvchi bo'limlar (Vertical list 2)
    directSubordinates: [
        {
            id: 'talabalar-orasida',
            title: "Talabalar orasida ijtimoiy-ma'naviy muhit barqarorligini ta'minlashga mas'ul bo'lgan direktor maslahatchisi",
            type: 'service',
            level: 2,
            position: { x: 4.2, y: 1.8 },
            parentId: 'direktor',
            head: { name: "Jabborov Orif", title: "Direktor maslahatchisi", email: "o.jabborov@jbnuu.uz" }
        },
        {
            id: 'korrupsiyaga-qarshi',
            title: 'Korrupsiyaga qarshi kurashish "komplayens-nazorat" tizimini boshqarish bo\'limi',
            type: 'service',
            level: 2,
            position: { x: 4.2, y: 2.8 },
            parentId: 'direktor',
            head: { name: "Mamatov Islom", title: "Bo'lim boshlig'i", email: "i.mamatov@jbnuu.uz" }
        },
        {
            id: 'ta\'lim-sifatini',
            title: "Ta'lim sifatini nazorat qilish bo'limi",
            type: 'service',
            level: 2,
            position: { x: 4.2, y: 3.5 },
            parentId: 'direktor',
            head: { name: "Soliyev Sherzod", title: "Bo'lim boshlig'i", email: "sh.soliyev@jbnuu.uz" },
            staff: [
                { name: "Hakimova Madina", title: "Bosh mutaxassis", email: "m.hakimova@jbnuu.uz" }
            ]
        },
        {
            id: 'jismoniy-yuridik',
            title: 'Jismoniy va yuridik shaxslarning murojaatlari bilan ishlash, nazorat va monitoring bo\'limi',
            type: 'service',
            level: 2,
            position: { x: 4.2, y: 4.3 },
            parentId: 'direktor',
            head: { name: "Aminova Guli", title: "Bo'lim boshlig'i", email: "g.aminova@jbnuu.uz" }
        },
        {
            id: 'bosh-muhandis',
            title: 'Bosh muhandis',
            type: 'service',
            level: 2,
            position: { x: 4.2, y: 5.0 },
            parentId: 'direktor',
            head: { name: "Yusupov Akmal", title: "Bosh muhandis", email: "a.yusupov@jbnuu.uz" }
        },
        {
            id: 'xodimlar',
            title: "Xodimlar bo'limi",
            type: 'service',
            level: 2,
            position: { x: 4.2, y: 5.4 },
            parentId: 'direktor',
            head: { name: "Rahmonov Baxtiyor", title: "Bo'lim boshlig'i", email: "b.rahmonov@jbnuu.uz" },
            staff: [
                { name: "Zokirova Nargiza", title: "Inspektor", email: "n.zokirova@jbnuu.uz" }
            ]
        },
        {
            id: 'xalqaro-hamkorlik',
            title: "Xalqaro hamkorlik bo'limi",
            type: 'service',
            level: 2,
            position: { x: 4.2, y: 5.8 },
            parentId: 'direktor',
            head: { name: "Sultonov Alisher", title: "Bo'lim boshlig'i", email: "a.sultonov@jbnuu.uz" },
            staff: [
                { name: "Kim Sergey", title: "Katta mutaxassis", email: "s.kim@jbnuu.uz" }
            ]
        },
        {
            id: 'devonxona-arxiv',
            title: "Devonxona va arxiv",
            type: 'service',
            level: 2,
            position: { x: 4.2, y: 6.2 },
            parentId: 'direktor',
            head: { name: "Odilov Jamol", title: "Mudiri", email: "j.odilov@jbnuu.uz" },
            staff: [
                {
                    name: "Nuriddinov Bekzod",
                    title: "Arxiv mudiri",
                    email: "b.nuriddinov@jbnuu.uz"
                },
                { name: "Xoliqova Mahliyo", title: "Ish yurituvchi", email: "m.xoliqova@jbnuu.uz" }
            ]
        },
        {
            id: '1-2-bolimlar',
            title: "1-2-bo'limlar",
            type: 'service',
            level: 2,
            position: { x: 4.2, y: 6.6 },
            parentId: 'direktor',
            head: { name: "Shokirov Husan", title: "Boshlig'i", email: "h.shokirov@jbnuu.uz" }
        },
        {
            id: 'yuriskonsult',
            title: 'Yuriskonsult',
            type: 'service',
            level: 2,
            position: { x: 4.2, y: 7.0 },
            parentId: 'direktor',
            head: { name: "Azizov Bobur", title: "Yurist", email: "b.azizov@jbnuu.uz" }
        },
        {
            id: 'matbuot-kotibi',
            title: 'Matbuot kotibi',
            type: 'service',
            level: 2,
            position: { x: 4.2, y: 7.4 },
            parentId: 'direktor',
            head: { name: "Oripova Sevara", title: "Matbuot kotibi", email: "s.oripova@jbnuu.uz" }
        }
    ],

    // Pastki bloklar
    bottomSection: [
        {
            id: 'registrator',
            title: 'REGISTRATOR OFISI',
            type: 'office',
            level: 2,
            position: { x: 0.5, y: 6.5 },
            parentId: 'direktor',
            head: { name: "Xalilov Jamshid", title: "Rahbar", email: "j.xalilov@jbnuu.uz" }
        },
        {
            id: 'xizmat-korsatish-front',
            title: "Xizmat ko'rsatish (front office) bo'limi",
            type: 'department',
            level: 3,
            position: { x: 0.2, y: 7.5 },
            parentId: 'registrator',
            staff: [
                { name: "Nurmatova Umida", title: "Operator", email: "u.nurmatova@jbnuu.uz" },
                { name: "Ahmadov Temur", title: "Maslahatchi", email: "t.ahmadov@jbnuu.uz" }
            ]
        },
        {
            id: 'malumotlar-bazasi',
            title: "Ma'lumotlar bazasi (back office) bo'limi",
            type: 'department',
            level: 3,
            position: { x: 0.8, y: 7.5 },
            parentId: 'registrator',
            staff: [
                { name: "Soliye Farrux", title: "Administrator", email: "f.soliyev@jbnuu.uz" }
            ]
        }
    ],

    facultiesSection: [
        {
            id: 'fakultetlar',
            title: 'FAKULTETLAR',
            type: 'faculties',
            level: 2,
            position: { x: 2, y: 6.5 },
            parentId: 'direktor'
        },
        {
            id: 'amaliy-matematika',
            title: 'Amaliy matematika',
            type: 'faculty',
            level: 3,
            position: { x: 1.6, y: 7.5 },
            parentId: 'fakultetlar',
            head: { name: "Xolmurodov Elmurod", title: "Dekan, f-m.f.n.", email: "e.xolmurodov@jbnuu.uz" },
            staff: [
                { name: "Boltayeva Dilnoza", title: "Dekan yordamchisi", email: "d.boltayeva@jbnuu.uz" },
                { name: "Sodikova Shohida", title: "Tyuner", email: "sh.sodikova@jbnuu.uz" }
            ]
        },
        {
            id: 'psixologiya',
            title: 'Psixologiya',
            type: 'faculty',
            level: 3,
            position: { x: 2.4, y: 7.5 },
            parentId: 'fakultetlar',
            head: { name: "Karimova Zilola", title: "Dekan, dotsent", email: "z.karimova@jbnuu.uz" },
            staff: [
                { name: "Usmonova Gulnoza", title: "Uslubchi", email: "g.usmonova@jbnuu.uz" },
                { name: "Jo'rayev Akmal", title: "Tyuner", email: "a.jorayev@jbnuu.uz" }
            ]
        },
        {
            id: 'kafedralar-1',
            title: 'Matematika va informatika kafedrasi',
            type: 'department',
            level: 4,
            position: { x: 1.6, y: 8.2 },
            parentId: 'amaliy-matematika',
            head: { name: "Nuriddinov Baxtiyor", title: "Kafedra mudiri, professor", email: "b.nuriddinov@jbnuu.uz" },
            staff: [
                { name: "Aliyeva Malika", title: "Katta o'qituvchi", email: "m.aliyeva@jbnuu.uz" },
                { name: "Azimov Sardor", title: "Assistent", email: "s.azimov@jbnuu.uz" },
                { name: "Ismoilov Jalol", title: "O'qituvchi", email: "j.ismoilov@jbnuu.uz" }
            ]
        },
        {
            id: 'kafedralar-2',
            title: 'Amaliy psixologiya kafedrasi',
            type: 'department',
            level: 4,
            position: { x: 2.4, y: 8.2 },
            parentId: 'psixologiya',
            head: { name: "Murodova Sayyora", title: "Kafedra mudiri, dotsent", email: "s.murodova@jbnuu.uz" },
            staff: [
                { name: "Jo'rayeva Guli", title: "Katta o'qituvchi", email: "g.jorayeva@jbnuu.uz" },
                { name: "Eshonqulov Mirshod", title: "Assistent", email: "m.eshonqulov@jbnuu.uz" }
            ]
        }
    ]
};

// Rang sxemasi - Updated for premium look
export const nodeColors = {
    council: {
        bg: 'from-slate-50 to-white',
        border: 'border-slate-300',
        text: 'text-slate-700',
        shadow: 'shadow-sm'
    },
    leadership: {
        bg: 'from-slate-50 to-white',
        border: 'border-slate-400',
        text: 'text-slate-800',
        shadow: 'shadow-md'
    },
    'vice-director': {
        bg: 'from-white to-slate-50',
        border: 'border-blue-300',
        text: 'text-blue-900',
        shadow: 'shadow-sm'
    },
    department: {
        bg: 'from-white to-white',
        border: 'border-slate-300',
        text: 'text-slate-700',
        shadow: 'shadow-sm'
    },
    center: {
        bg: 'from-white to-white',
        border: 'border-slate-300',
        text: 'text-slate-700',
        shadow: 'shadow-sm'
    },
    service: {
        bg: 'from-white to-white',
        border: 'border-slate-300',
        text: 'text-slate-600',
        shadow: 'shadow-sm'
    },
    office: {
        bg: 'from-slate-50 to-white',
        border: 'border-slate-400',
        text: 'text-slate-800',
        shadow: 'shadow-sm'
    },
    faculties: {
        bg: 'from-slate-50 to-white',
        border: 'border-slate-400',
        text: 'text-slate-800',
        shadow: 'shadow-sm'
    },
    faculty: {
        bg: 'from-white to-white',
        border: 'border-slate-300',
        text: 'text-slate-700',
        shadow: 'shadow-sm'
    }
};
