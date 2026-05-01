export const getFeaturesData = (t) => [
    {
        id: 1,
        title: t('features.items.0.title'),
        link: "/about",
        text: t('features.items.0.text'),
        fullText: `Mirzo Ulug'bek nomidagi O'zbekiston Milliy universiteti nafaqat mamlakatimiz, balki Markaziy Osiyodagi eng qadimiy va nufuzli oliy ta'lim muassasalaridan biridir. Uning Jizzax filiali ham ushbu boy tarixiy an'analar va ilmiy merosga asoslangan holda faoliyat yuritadi.
        
        ### Boy Tarix va Meros
        Universitet tarixi davomida shakllangan ilmiy maktablar, ustoz-shogird an'analari va fundamental ta'lim tamoyillari filialimizda ham o'z aksini topgan. Biz talabalarimizga nafaqat zamonaviy bilimlar berish, balki ularni milliy va umuminsoniy qadriyatlar ruhida tarbiyalashga alohida e'tibor qaratamiz.
        
        ### Bizning Maqsadimiz
        Tarixiy an'analarni saqlab qolgan holda, ta'lim jarayoniga ilg'or pedagogik texnologiyalarni joriy etish - bizning asosiy maqsadimizdir. Biz o'tmishning buyuk mutaffakirlari, xususan Mirzo Ulug'bek bobomizning ilmiy izlanishlarini bugungi kun innovatsiyalari bilan birlashtiramiz.
        
        ### Ustuvor Yo'nalishlar
        - Fundamental fanlarni chuqur o'rgatish
        - Ma'naviy-ma'rifiy qadriyatlarni asrab-avaylash
        - Ustoz-shogird an'analarini davom ettirish
        - Milliy o'zlikni anglash va vatanparvarlik ruhida tarbiyalash`,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        bgColor: "bg-amber-50",
        iconColor: "text-amber-600",
        // images: [
        //     "https://images.unsplash.com/photo-1590072223831-bb62c146a5df?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1523050335392-9bf5675f42e8?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200"
        // ]
    },
    {
        id: 2,
        title: t('features.items.1.title'),
        link: "/structure",
        text: t('features.items.1.text'),
        fullText: `Filialimiz eng so'nggi texnologiyalar va zamonaviy infratuzilma bilan ta'minlangan yangi binoda joylashgan. Talabalar uchun barcha qulayliklar yaratilgan bo'lib, o'quv jarayoni xalqaro standartlarga to'la javob beradi.
        
        ### O'quv va Tadqiqot Imkoniyatlari
        Binomizda 50 dan ortiq zamonaviy auditoriyalar, maxsus jihozlangan laboratoriyalar va AKT markazlari mavjud. Har bir xona multimedia vositalari va yuqori tezlikdagi internet tarmog'i bilan ta'minlangan.
        
        ### Asosiy Qulayliklar
        - **Smart-auditoriyalar:** Interaktiv doskalar va planshetlar bilan jihozlangan.
        - **Zamonaviy Laboratoriyalar:** Fizika, kimyo va biologiya bo'yicha eng so'nggi uskunalar.
        - **Kutubxona:** 100,000 dan ortiq kitob fondi va elektron resurslar bazasi.
        - **Sport Majmualari:** Yopiq sport zali, futbol maydoni va tennis kortlari.
        - **Talabalar shaharchasi:** 500 o'rinli zamonaviy yotoqxona va shinam oshxona.
        
        O'quv binosi nafaqat bilim olish, balki talabalarning ijodiy va ijtimoiy faolligini oshirish uchun mo'ljallangan keng foye va kreativ zonalarga ega.`,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        bgColor: "bg-blue-50",
        iconColor: "text-blue-600",
        // images: [
        //     "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
        // ]
    },
    {
        id: 3,
        title: t('features.items.2.title'),
        link: "/activities",
        text: t('features.items.2.text'),
        fullText: `Filialimizda o'z sohasining yetuk mutaxassislari, fan doktorlari va professorlar faoliyat yuritmoqda. Professor-o'qituvchilar tarkibining salohiyati ta'lim sifatining asosiy kafolati hisoblanadi.
        
        ### Professor-o'qituvchilar Tarkibi
        Hozirgi kunda filialda 150 nafardan ortiq yuqori malakali o'qituvchilar dars berishadi. Ularning 40 foizidan ortig'i ilmiy darajaga ega bo'lib, ko'plab xalqaro darajadagi tadqiqotchilardir.
        
        ### Ta'lim va Sifat Monitoringi
        Biz doimiy ravishda pedagogik tarkibning malakasini oshirish, xorijiy mutaxassislarni jalb qilish va o'zaro tajriba almashish ustida ishlaymiz. Talabalarimizga dars beradigan o'qituvchilar nafaqat nazariy bilimga, balki katta amaliy tajribaga ham ega.
        
        ### Bizning Yutuqlarimiz
        - 10 dan ortiq mualliflik darsliklari va o'quv qo'llanmalar
        - Yillik 50 dan ortiq ilmiy maqolalar Skopus va Web of Science bazalarida
        - Xorijiy oliy ta'lim muassasalari bilan 20 dan ortiq hamkorlik shartnomalari
        - Muntazam ravishda o'tkaziladigan 'Master-klass' mashg'ulotlari`,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
        ),
        bgColor: "bg-emerald-50",
        iconColor: "text-emerald-600",
        // images: [
        //     "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200"
        // ]
    },
    {
        id: 4,
        title: t('features.items.3.title'),
        link: "/science",
        text: t('features.items.3.text'),
        fullText: `Ilm-fan va innovatsiyalar - zamonaviy universitetning ajralmas qismidir. Jizzax filialida ilmiy-tadqiqot ishlariga katta e'tibor qaratilmoqda.
        
        ### Ilmiy-Innovatsion Markaz
        Iqtidorli talabalarni ilmiy faoliyatga keng jalb qilish, startap loyihalarini qo'llab-quvvatlash va innovatsion g'oyalarni ro'yobga chiqarish uchun barcha sharoitlar yaratilgan. Filial qoshida tashkil etilgan ilmiy to'garaklar va laboratoriyalarda talabalar o'zlarining ilk ilmiy ishlarini olib borishmoqda.
        
        ### Xalqaro Hamkorlik va Grantlar
        Biz xalqaro ilmiy hamkorlikni rivojlantirish, nufuzli jurnallarda maqolalar chop etish va xalqaro grantlarda ishtirok etishni faol qo'llab-quvvatlaymiz. AQSH, Janubiy Koreya va Yevropa oliygohlari bilan qo'shma ilmiy loyihalar ustida ishlamoqdamiz.
        
        ### Tadqiqot Yo'nalishlari
        - Sun'iy intellekt va ma'lumotlar tahlili
        - Ijtimoiy-iqtisodiy jarayonlarni modellashtirish
        - Pedagogik texnologiyalar va psixologiya
        - Qayta tiklanuvchi energiya manbalari
        - Ekologiya va atrof-muhit muhofazasi`,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        bgColor: "bg-indigo-50",
        iconColor: "text-indigo-600",
        // images: [
        //     "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1576086213369-97a306dca665?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200"
        // ]
    },
    {
        id: 5,
        title: t('features.items.4.title'),
        link: "/achievements",
        text: t('features.items.4.text'),
        fullText: `Bizning asosiy maqsadimiz - raqobatbardosh, zamonaviy fikrlaydigan va o'z kasbining ustasi bo'lgan mutaxassislarni tayyorlashdir.
        
        ### Karyera va Rivojlanish
        Bitiruvchilarimiz nafaqat davlat tashkilotlarida, balki xususiy sektor va xalqaro kompaniyalarda ham muvaffaqiyatli faoliyat yuritishlari uchun zarur bo'lgan ko'nikmalarni egallaydilar. Karyera markazimiz talabalarga amaliyot o'tash joylarini topish va ishga joylashishda ko'maklashadi.
        
        ### Bitiruvchilarimizning Muvaffaqiyati
        Bugungi kunga qadar filialimizni tamomlagan talabalarning 95 foizdan ortig'i o'z mutaxassisligi bo'yicha ishga joylashgan. Ularning ko'pchiligi nufuzli tashkilotlarda rahbarlik va mas'ul lavozimlarda faoliyat yuritishmoqda.
        
        ### Kelajak Rejalari
        - Talabalar almashinuvi dasturlarini kengaytirish (Erasmus+)
        - Xorijiy universitetlar bilan 'Double Degree' dasturlarini yo'lga qo'yish
        - Bitiruvchilarning xalqaro sertifikatlar (IELTS, ACCA va h.k.) olishini ta'minlash
        - Tadbirkorlik va biznes-inkubatorlar faoliyatini rivojlantirish`,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        bgColor: "bg-purple-50",
        iconColor: "text-purple-600",
        // images: [
        //     "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
        // ]
    },
    {
        id: 6,
        title: t('features.items.5.title'),
        link: "/enlightenment",
        text: t('features.items.5.text'),
        fullText: `Universitet - bu faqat bilim olish maskani emas, balki shaxs sifatida shakllanish joyidir. Filialimizda sog'lom va ijodiy ma'rifiy muhit hukm surmoqda.
        
        ### Talabalar Hayoti va Ijtimoiy Faollik
        Muntazam ravishda o'tkaziladigan madaniy tadbirlar, festivallar, intellektual o'yinlar va sport musobaqalari talabalarning bo'sh vaqtini mazmunli o'tkazishlariga xizmat qiladi. Jamoat ishlari va ko'ngilli loyihalar talabalarda yetakchilik qobiliyatini rivojlantiradi.
        
        ### Faol Klub va To'garaklar
        - **Zakovat:** Intellektual o'yinlar klubi.
        - **Teatr studiyasi:** Ijodkor talabalar uchun san'at makoni.
        - **Quvnoqlar va zukkolar (QVZ):** Talabalarning hazil-mutoyiba va sahna mahorati.
        - **Kitobxonlar klubi:** Badiiy asarlar muhokamasi va uchrashuvlar.
        - **Yosh volontyorlar:** Ijtimoiy yordam va xayriya loyihalari.
        
        Biz talabalarda yuksak ma'naviy fazilatlarni, vatanparvarlik tuyg'usini va estetik didni shakllantirishga alohida e'tibor qaratamiz. Universitetimizda talabalik yillari hayotdagi eng unutilmas davr bo'lishi uchun barcha imkoniyatlar yaratilgan.`,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        bgColor: "bg-teal-50",
        iconColor: "text-teal-600",
        // images: [
        //     "https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1200",
        //     "https://images.unsplash.com/photo-1529070538774-1844bb22c590?auto=format&fit=crop&q=80&w=1200"
        // ]
    }
];


