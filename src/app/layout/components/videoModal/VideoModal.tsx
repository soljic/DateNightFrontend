import React,{useState} from 'react'
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video';
import { useStore } from '../../../stores/store';
import PlayButton from '../playButton/PlayButton';
import './VideoModal.scss'


const VideoModal = () => {

	const [isOpen, setOpen] = useState(false)
	const { activityStore } = useStore();
    const { isPlay, setIsPlayed } = activityStore;
	return (
		<>
			<ModalVideo channel='youtube' autoplay isOpen={isPlay} playlist={null} show_related={0} videoId="udY43X_cRvw" onClose={() => setIsPlayed(false)} />

			<PlayButton/>
		</>
	)
}

export default VideoModal
