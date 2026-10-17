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
};

export const PORTFOLIO_CONTENT: PortfolioItem[] = [
  {
    name: "The Unity Cup | Mini Doc",
    description:
      "A cinematic recap of Unity Cup 2026, capturing the emotion, energy and community behind the event. More than a football match, the film celebrates unity, remembrance and the legacy of four brothers who inspired the occasion.",
    img: "https://djpguts9gwm3x.cloudfront.net/ad3xUA0zS94v.jpg",
    url: "https://www.youtube.com/watch?v=MPNyBrB5bX8",
  },
  {
    name: "The Shirt Vault X Rio Cardines",
    description:
      "Capturing the  Shirt Vault delivery of the debut shirt of Crystal Palace & Trinidad and Tobago International, Rio Cardines ",
    img: "https://djpguts9gwm3x.cloudfront.net/2EGycqhdJmMQ2O52.jpg",
    url: "https://www.instagram.com/reel/Da-WyvCNDF_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    name: "Future Culture X World Cup Screening",
    description:
      "Promo for the World Cup Activation event hosted by Future Culture",
    img: "https://djpguts9gwm3x.cloudfront.net/V5s8Eu3S7RxWtB43.jpg",
    url: "https://www.youtube.com/watch?v=-BoMOUpRX40",
    slug: "future-culture-x-world-cup-screening",
    video:
      "https://res.cloudinary.com/z6gspcmd/video/upload/q_auto,f_auto/v1792198089/GamingVideo_v2-3.mp4",
    concept: `Future Culture's World Cup activation was built around screening the games, so I wanted to tap into something every fan has actually done themselves... picking a squad in FIFA. The video recreates the game's team selection screen, whilst playing the legendary FIFA 14 soundtrack by John Newman, 
      swapping in talent from the event in place of the usual roster. FYI, The screen itself was built and masked onto a black background in After Effects`,
  },
  {
    name: "Youtube Series | Road to London Marathon",
    description:
      "3 part series following the journey of a Rudy (Founder of RoCUP and Contraband) preparing for the London Marathon, showcasing training, nutrition, and mental preparation.",
    img: "https://djpguts9gwm3x.cloudfront.net/a2OIV224N1MW3vrz.jpg",
    url: "https://youtu.be/hgfCoM0LVoo?si=3dDKPkALrIRRBLRL",
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
