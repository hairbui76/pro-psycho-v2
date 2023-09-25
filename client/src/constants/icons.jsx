import CustomIcon from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faNewspaper,
	faPodcast,
	faHeadphones,
	faFileLines,
	faUser,
	faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const NewspaperCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faNewspaper} />} />
);

const PodcastCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faPodcast} />} />
);

const MusicCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faHeadphones} />} />
);

const DocumentCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faFileLines} />} />
);

const UserCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faUser} />} />
);

const AccountEditCustomIcon = () => (
	<CustomIcon component={() => <FontAwesomeIcon icon={faPenToSquare} />} />
);

export {
	NewspaperCustomIcon,
	PodcastCustomIcon,
	MusicCustomIcon,
	DocumentCustomIcon,
	UserCustomIcon,
	AccountEditCustomIcon,
};
