import { Gem, Heart, Star, Crown, Sparkles } from 'lucide-react'

export const categories = [
    { id: 'new', name: 'New Arrivals' },
    { id: 'rings', name: 'Rings' },
    { id: 'falange', name: 'Falange Rings' },
    { id: 'bracelets', name: 'Bracelets' },
    { id: 'chains', name: 'Chains' },
    { id: 'mens', name: 'Mens Wear' },
    { id: 'pendants', name: 'Pendants' },
    { id: 'earrings', name: 'Earrings' },
  ];

  export const hightlightsSlides = [
    {
      id: 1,
      textLists: [
        "Уникальный Дизаин",
        "Дизайн наших украшений пронизывают ",
        "древние символы народов мира и дух природы.",
      ],
      video: "/videos/1013.mov",
      videoDuration: 2.5,
    },
    {
      id: 2,
      textLists: ["Собственное производство", "Дизайн-студия и мастерская ZaavG", "находятся в самом сердце острова Бали."],
      video: "/videos/1013.mov",
      videoDuration: 2.5,
    },
    {
      id: 3,
      textLists: [
        "Ручная работа",
        "Все наши украшения создаются вручную ",
        "лучшими мастерами острова.",
      ],
      video: "/videos/1013.mov",
      videoDuration: 6,
    },
    {
      id: 4,
      textLists: ["Натуральные материалы", "Мы используем серебро 925 пробы, золото 24 карата и натуральные камни."],
      video: "/videos/1013.mov",
      videoDuration: 6,
    },
    {
      id: 5,
      textLists: ["Гарантия", "Наши изделия проходят жесткий контроль качества."],
      video: "/videos/1013.mov",
      videoDuration: 6,
    },
    {
      id: 6,
      textLists: ["Доставка по всему миру", "Доставим украшения в любой уголок нашей планеты."],
      video: "/videos/1013.mov",
      videoDuration: 6,
    },
  ];

  export const points = [
    {
      Icon: Gem,
      color: 'text-emerald-400',
      title: 'Натуральные Камни',
      description: 'Используем только подлинные драгоценные и полудрагоценные камни с острова Бали.',
      image: "/IMG_4805.jpg",
      status: 100,
      date: 'Март 2024',
      category: 'МАТЕРИАЛЫ'
    },
    {
      Icon: Heart,
      color: 'text-rose-400',
      title: 'Ручная Работа',
      description: 'Каждое украшение создается вручную мастерами с многолетним опытом.',
      image: "/IMG_4807.jpg",
      status: 100,
      date: 'Февраль 2024',
      category: 'МАСТЕРСТВО'
    },
    {
      Icon: Star,
      color: 'text-purple-400',
      title: 'Уникальный Дизайн',
      description: 'Авторские дизайны, вдохновленные древними символами и природой Бали.',
      image: "/IMG_4807.jpg",

      status: 100,
      date: 'Январь 2024',
      category: 'ДИЗАЙН'
    },
    {
      Icon: Crown,
      color: 'text-amber-400',
      title: 'Серебро 925',
      description: 'Высококачественное серебро 925 пробы с покрытием из золота 24 карата.',
      image: "/IMG_4800.jpg",
      status: 100,
      date: 'Декабрь 2023',
      category: 'КАЧЕСТВО'
    },
    {
      Icon: Sparkles,
      color: 'text-cyan-400',
      title: 'Энергетика Бали',
      description: 'Украшения заряжены особой энергетикой священного острова Бали.',
      image: "/IMG_4800.jpg",

      status: 100,
      date: 'Ноябрь 2023',
      category: 'ДУХОВНОСТЬ'
    },
  ];
