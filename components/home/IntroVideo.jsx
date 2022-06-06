export function IntroVideo() {
  return (
    <div className="container mx-auto justify-center my-4 py-16">
      <div className="flex flex-col mx-auto items-center mt-4">
        <h1 className="font-bold text-6xl text-sp-white text-center tracking-wide mb-3">
          Keep memories of your<br></br>
          loved ones,{" "}
          <span className="underline decoration-sp-fawn underline-offset-8">
            forever
          </span>
        </h1>
        <p className="text-sp-white text-2xl font-medium text-center tracking-tight leading-6 mb-3 mt-2">
          Spiritus is a platform for creating and storing digital<br></br>{" "}
          memorials through storytelling
        </p>
        <div className="inline-flex gap-4 py-2 items-center">
          <button className="bg-sp-fawn border-5 border-sp-medium border-opacity-80 hover:-rotate-6 duration-500 hover:border-0  rounded-full py-2 px-9 font-medium">
            Get the app
          </button>
          <button className="bg-black border-sp-medium border rounded-full py-2 px-8 font-medium text-sp-white inline-flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:bg-white rounded-full hover:stroke-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Intro video
          </button>
        </div>
      </div>
    </div>
  );
}

// function GEAButton() {
//   const { activityStore } = useStore();
//   const { isModal, setIsModal } = activityStore;
//   const {t} = useTranslation();
//   return (
//     <div className="image-wrapper" onClick={() => {
//       setIsModal(!isModal);
//     }} dangerouslySetInnerHTML={{__html:t('get_the_app')}} />

//   );
// }

// export function IntroVideo() {
//   return (
//     <div className="container">
//       <div className="row justify-content-center rowHeaders">
//         <div className="col col-12">
//           <Header />
//           <HeaderThree />
//           <div className="twoButtons">
//             <div className="geaButton">
//               <GEAButton />
//             </div>
//             <div>
//               <VideoModal />
//             </div>
//           </div>
//         </div>
//         <BackgroundVideo />
//       </div>
//     </div>
//   );
// }

// function Header() {
//     const {t} = useTranslation();
//     return (
//         <div className="container">
//             <div className="row justify-content-center">

//                 <div className="col-lg-8 col-md-12 col-sm-12 col-12 headerPosition ">
//                     <h1 dangerouslySetInnerHTML={{__html:t('homepage_title')}}/>
//                 </div>
//             </div>

//         </div>
//     )
// }

// function HeaderThree() {

// 	const {t} = useTranslation();
// 	return (
// 	  <>
// 		<div className="container hthree">
// 		  <div className="row justify-content-center">
// 			<div className="col col-11 col-lg-6 headerThreePosition">
// 				<h3 className="headerThree">
// 				{t('homepage_h3')}

// 				</h3>
// 			</div>
// 		  </div>
// 		</div>
// 	  </>
// 	);
//   }

// const VideoModal = () => {

// 	const [isOpen, setOpen] = useState(false)
// 	const { activityStore } = useStore();
// 	const { isPlayed, setIsPlayed } = activityStore;
// 	return (
// 		<>
// 			<ModalVideo channel='youtube' autoplay isOpen={isPlayed} playlist={null} show_related={0} videoId= {i18next.language == 'en' ? 'nH1AcuiIkYs' : 'PZR3zFyJXRc'}  onClose={() => setIsPlayed(false)} />

// 			<PlayVideoButton/>
// 		</>
// 	)
// }

// function BackgroundVideo() {
// 	const { activityStore } = useStore();
// 	const { isPlayed, setIsPlayed } = activityStore;
// 	const [isShown, setIsShown] = useState(false);
// 	return (
// 	  <div className="videoDivBackground">
// 		<video autoPlay loop muted width="99%" height="79%" className="videoBackground">
// 		  <source src={Spirituswebbgvideo} type="video/mp4" />
// 		</video>
// 		<div className="videoTextBackground">
// 		  <div
// 			onClick={() => {
// 			  setIsPlayed(true);
// 			}}
// 			onMouseEnter={() => setIsShown(true)}
// 			onMouseLeave={() => setIsShown(false)}
// 			className="buttonAndText"
// 		  >
// 			<img
// 			  className="imageBackgroundVideo"
// 			  src={isShown ? BackgroundVideoWhiteButton : PlayBackgroundVideo}
// 			  alt=""
// 			/>

// 			<p className="videoTextParagraph">INTRO VIDEO — 2MIN</p>
// 		  </div>
// 		</div>
// 	  </div>
// 	);
//   }

// function PlayVideoButton() {
// 	const { activityStore } = useStore();
// 	const { isPlayed, setIsPlayed } = activityStore;
// 	const [isShown, setIsShown] = useState(false);
// 	const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

// 	  return (
// 		!isMobile ?
// 	<Button
// 	onClick={() => {
// 	  setIsPlayed(true);
// 	}}
// 	className="button-link-playVideo"
// 	type="link"
// 	onMouseEnter={() => setIsShown(true)}
// 	onMouseLeave={() => setIsShown(false)}>

//   <img className="imageIntro" src={isShown ? WhiteButton : AButton} alt="ArrowImage" />
//   Intro video
//   </Button>
//   : null
// 	  );
//   }
