export type PortfolioItem = {
  name: string;
  description: string;
  img: string;
  url: string;
  // Optional: items with both set get their own case-study page at
  // /projects/[slug], with the video embedded and playable on-page
  // instead of only linking out to YouTube/Instagram.
  slug?: string;
  video?: string;
  concept?: string;
  // "portrait" for vertical-shot footage (e.g. Instagram reels); the
  // project page sizes the video player differently for each.
  orientation?: "landscape" | "portrait";
  // ISO 8601 date (YYYY-MM-DD) this was first published on its original
  // platform (or filmed, if there's no external link). Only used for
  // VideoObject's uploadDate on case-study pages - required by Google for
  // video rich-result eligibility.
  uploadDate?: string;
  // ISO 8601 duration (e.g. "PT36S", "PT1M26S"), for VideoObject markup.
  duration?: string;
};

export const PORTFOLIO_CONTENT: PortfolioItem[] = [
  {
    name: "Maranoia | NSLB X Nike",
    description:
      "An NSLB and Nike event held before the 2026 TCS London Marathon, a single day of sprint and endurance races for a shot at four £1,000 prizes.",
    img: "https://res.cloudinary.com/z6gspcmd/video/upload/v1792234481/maranoia.jpg",
    url: "https://www.instagram.com/reel/DXto2xNCBNZ/?srtk=ZWIxa3hhejV3MXBm",
    slug: "maranoia-nslb-x-nike",
    uploadDate: "2026-04-29",
    duration: "PT29S",
    video:
      "https://res.cloudinary.com/z6gspcmd/video/upload/q_auto,f_auto/v1792234481/maranoia.mp4",
    concept:
      "NSLB brings people together around self improvement beyond the gym, and this one was run with Nike ahead of the 2026 TCS London Marathon. 140 runners were picked at random to race for a shot at four £1,000 prizes, with invite only relays rounding things out. I wanted to capture the whole day, not just the races but everything around them, the NSLB pop up, the recovery stations, the food, everything that made it feel like a proper hub rather than just a race.",
  },
  {
    name: "Pana Run Club | Hackney Half bLOCKparty",
    description:
      "Pana Run Club's block party after the Hackney Half Marathon, capturing the atmosphere of the celebration.",
    img: "https://res.cloudinary.com/z6gspcmd/video/upload/v1792234913/pananaonana.jpg",
    url: "https://www.instagram.com/reel/DYfM1vHI_6Z/?cplk=MWZ3eDQ3MDM5Mmhqdg==",
    slug: "pana-run-club-hackney-half-blockparty",
    uploadDate: "2026-05-18",
    duration: "PT21S",
    video:
      "https://res.cloudinary.com/z6gspcmd/video/upload/q_auto,f_auto/v1792234913/pananaonana.mp4",
    concept:
      "This one was purely about the vibe, fast cuts, music led, and framed around the moments where people's emotions were most visible.",
  },
  {
    name: "Future Culture X World Cup Activation",
    description:
      "Promo for the World Cup Activation event hosted by Future Culture",
    img: "https://djpguts9gwm3x.cloudfront.net/V5s8Eu3S7RxWtB43.jpg",
    url: "https://www.youtube.com/watch?v=-BoMOUpRX40",
    slug: "future-culture-x-world-cup-activation",
    uploadDate: "2026-06-16",
    duration: "PT38S",
    video:
      "https://res.cloudinary.com/z6gspcmd/video/upload/q_auto,f_auto/v1792198089/GamingVideo_v2-3.mp4",
    concept: `Future Culture's World Cup activation was built around screening the games, so I wanted to tap into something every fan has actually done themselves... picking a squad in FIFA. The video recreates the game's team selection screen, whilst playing the legendary FIFA 14 soundtrack by John Newman, 
      swapping in talent from the event in place of the usual roster. FYI, The screen itself was built and masked onto a black background in After Effects`,
  },
  {
    name: "The Shirt Vault X Rio Cardines",
    description:
      "Capturing The  Shirt Vault delivery of the debut shirt of Crystal Palace & Trinidad and Tobago International, Rio Cardines ",
    img: "https://djpguts9gwm3x.cloudfront.net/2EGycqhdJmMQ2O52.jpg",
    url: "https://www.instagram.com/reel/Da-WyvCNDF_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    slug: "the-shirt-vault-x-rio-cardines",
    uploadDate: "2026-07-19",
    duration: "PT36S",
    video:
      "https://res.cloudinary.com/z6gspcmd/video/upload/q_auto,f_auto/v1792234947/TSV_Lil_Baby_Clean.mp4",
    orientation: "portrait",
    concept: `The Shirt Vault makes custom shirt frames for athletes. This one marked Rio Cardines' debut for both Crystal Palace and Trinidad & Tobago, so rather than script anything, I just filmed the handover and let his reaction carry it. 
      Add values to clients business as it showwhat his customers feel the first time they see their frame.`,
  },
  {
    name: "Hyrox | Rotterdam 2026",
    description:
      "A fast-paced recap of HYROX Rotterdam 2026, built to capture the energy and emotion of race day.",
    img: "https://res.cloudinary.com/z6gspcmd/video/upload/v1792234432/hyrox.jpg",
    url: "https://www.instagram.com/reel/DXZsuzToVqT/?utm_source=ig_web_copy_link&obrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
    slug: "hyrox-rotterdam-2026",
    uploadDate: "2026-04-21",
    duration: "PT30S",
    video:
      "https://res.cloudinary.com/z6gspcmd/video/upload/q_auto,f_auto/v1792234432/hyrox.mp4",
    concept:
      "I wanted the edit to put you inside the chaos of race day, whether you're competing or watching from the sidelines. Using fast cuts, slow motion and a low shutter speed, something new happens on screen every one to two seconds, keeping it engaging while mirroring how overwhelming and fast the event actually feels in person.",
  },
  {
    name: "Youtube Series | Road to London Marathon",
    description:
      "3 part series following the journey of a Rudy (Founder of RoCUP and Contraband) preparing for the London Marathon, showcasing training, nutrition, and mental preparation.",
    img: "https://djpguts9gwm3x.cloudfront.net/a2OIV224N1MW3vrz.jpg",
    url: "https://youtu.be/hgfCoM0LVoo?si=3dDKPkALrIRRBLRL",
  },
  {
    name: "CEI Bridal",
    description:
      "A campaign film for CÉI Bridal, the contemporary bridal brand rooted in Somali heritage and craftsmanship.",
    img: "https://res.cloudinary.com/z6gspcmd/video/upload/v1792234951/CEI.jpg",
    url: "https://www.instagram.com/reel/DYdMA0ut3Wl/?xtok=MWN3NDFtYnRvaXdpOA==",
    slug: "cei-bridal",
    uploadDate: "2026-05-17",
    duration: "PT46S",
    video:
      "https://res.cloudinary.com/z6gspcmd/video/upload/q_auto,f_auto/v1792234951/CEI.mp4",
    orientation: "portrait",
    concept:
      "I wanted the film to feel elegant and intentional, holding back what it's actually about until right at the end, so the reveal carries the same weight as the garment itself.",
  },
  {
    name: "Birmingham United X Uber",
    description:
      "A collaboration between Uber and Birmingham United, following two young footballers and how long journeys to training affect their performance.",
    img: "https://res.cloudinary.com/z6gspcmd/video/upload/v1792234947/BU_Uber_HD.jpg",
    url: "https://www.instagram.com/reel/DZKvCN2qA35/?dlrf=cjg2bWZreGwzeTM0",
    slug: "birmingham-united-x-uber",
    uploadDate: "2026-06-04",
    duration: "PT1M26S",
    video:
      "https://res.cloudinary.com/z6gspcmd/video/upload/q_auto,f_auto/v1792234947/BU_Uber_HD.mp4",
    concept:
      "I wanted to tell two contrasting stories side by side, showing how something as simple as the distance to training can shape a young player's experience of the game.",
  },
  {
    name: "Endure Run Club | Pay What You Earn",
    description:
      "For Endure Run Club's limited tracksuit drop, your price was set by your own 5K time, down to the second.",
    img: "https://res.cloudinary.com/z6gspcmd/video/upload/v1792234901/PayWhatYouEarn.jpg",
    url: "https://www.instagram.com/reel/DZcxeYZKn6i/?dlrf=N3ZkOWwxaW14Njlq",
    slug: "endure-run-club-pay-what-you-earn",
    uploadDate: "2026-06-11",
    duration: "PT36S",
    video:
      "https://res.cloudinary.com/z6gspcmd/video/upload/q_auto,f_auto/v1792234901/PayWhatYouEarn.mp4",
    concept:
      "The film follows one runner's 5K from start to finish, then to a secret location where she collects the tracksuit she just earned, literally paying what she ran.",
  },
  {
    name: "Endure Run Club | Marrakesh Half Marathon",
    description:
      "Endure Run Club at the Marrakesh Half Marathon, raising money for Salaam charity.",
    img: "https://res.cloudinary.com/z6gspcmd/video/upload/v1792234454/MarakeshMarathon.jpg",
    url: "",
    slug: "endure-run-club-marrakesh-half-marathon",
    uploadDate: "2026-01-25",
    duration: "PT38S",
    video:
      "https://res.cloudinary.com/z6gspcmd/video/upload/q_auto,f_auto/v1792234454/MarakeshMarathon.mp4",
    concept:
      "I wanted this one to just capture the vibe of race day, the energy of the course and the Endure runners taking it on for Salaam.",
  },
  {
    name: "The Unity Cup | Mini Doc",
    description:
      "A cinematic recap of Unity Cup 2026, capturing the emotion, energy and community behind the event. More than a football match, the film celebrates unity, remembrance and the legacy of four brothers who inspired the occasion.",
    img: "https://djpguts9gwm3x.cloudfront.net/ad3xUA0zS94v.jpg",
    url: "https://www.youtube.com/watch?v=MPNyBrB5bX8",
  },
  {
    name: "Endure Run Club | Birmingham Half Marathon Sign up Activation",
    description:
      "Promotional piece for the Endure Run Club to get members involved in the Birmingham Half",
    img: "https://djpguts9gwm3x.cloudfront.net/lJddT9vtyUml2Em6.jpg",
    url: "https://www.instagram.com/reel/DWZ7q7BCubq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    name: "Top Baller X Deestroying",
    description:
      "Top Baller x Deestroying U16 1v1 event. The next generation of football talent go head-to-head, showcasing skill, flair, and passion in a high-energy competition.",
    img: "https://djpguts9gwm3x.cloudfront.net/4j74vAYY0dBA4M9r.jpg",
    url: "https://www.instagram.com/reel/DQpY0D5iC0Q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    name: "Puma X Represent Event",
    description:
      "Represent x PUMA FW25 host a football event at Battersea Power Station celebrating the fusion of sport and style through their latest collaborative collectionrtals.",
    img: "https://djpguts9gwm3x.cloudfront.net/f04Hqg651vSEJYuo.jpg",
    url: "https://www.instagram.com/reel/DP1sa0diDht/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    name: "Monzz x Platinum Services",
    description:
      "Platinum Services teamed up with Monzz, working together to inspire and guide students through the journey of getting into higher education",
    img: "https://djpguts9gwm3x.cloudfront.net/6sqrFj3Kvb0HS51j.jpg",
    url: "https://www.instagram.com/reel/DM0e0mtIpjY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    name: "Marathon Prep Ad",
    description:
      "A look into the start of a marathon prep journey featuring a VO₂ max test, track work, and road runs toward a 2hr 30min goal.",
    img: "https://djpguts9gwm3x.cloudfront.net/Vt87Fs8MsCWvZESR.jpg",
    url: "https://www.instagram.com/reel/DN02lK8UJLl/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    name: "Liverpool vs Everton WSL",
    description:
      "A look at the WSL Merseyside Derby | Liverpool vs Everton, where passion, rivalry, and top-tier football meet as both sides battle for city pride.",
    img: "https://djpguts9gwm3x.cloudfront.net/ltF6tVRcIzI6KF8i.jpg",
    url: "https://www.instagram.com/reel/DOY6aJZiF1o/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    name: "The Shirt Vault X Rumarn Burrell",
    description:
      "Capturing the  Shirt Vault Framing and delivery of the debut shirt of QPR & Jamaica International, Rumarn Burrell ",
    img: "https://djpguts9gwm3x.cloudfront.net/GoRJ21Dfx7498ov3.jpg",
    url: "https://www.instagram.com/reel/DPbRpekjY_i/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    name: "PK Humble | Baller League | S2 MD1",
    description:
      "PK Humbles takes the stage at the Copperbox Arena for Yanited, for the first match day of the Baller League season.",
    img: "https://djpguts9gwm3x.cloudfront.net/h0tC525kPojwR6R7.jpg",
    url: "https://www.instagram.com/reel/DQkKAkGiNXn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    name: "ByTheBars 1v1 Calisthenics",
    description:
      "A look inside a 1v1 calisthenics event hosted by ByTheBars showcasing strength, control, and creativity as athletes go head-to-head in raw street-style competition.",
    img: "https://djpguts9gwm3x.cloudfront.net/LsRWG2205uQWdA4a.jpg",
    url: "https://www.instagram.com/reel/DOttBlPiLUX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    name: "Bham UTD X Vesey Nations Cup",
    description:
      "6 nations, one city, one beautiful game. Custom national jerseys, real pride, pure football energy.",
    img: "https://djpguts9gwm3x.cloudfront.net/VRJMrb0ec4ZUP8EL.jpg",
    url: "https://www.instagram.com/reel/DMdh8obKEeS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    name: "Ibraheem Spider Sulaimaan🕷️",
    description:
      "Ibraheem ‘Spider’ Sulaimaan sharpens his craft at the open training session ahead of his 7th fight. Focused, Hungry and Ready for war.",
    img: "https://djpguts9gwm3x.cloudfront.net/WFa4Gk774zzDLlWn.jpg",
    url: "https://www.instagram.com/reel/DEnj_qDsMXU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];
