const FAKE_BOOKS = [
	{
		id: 1,
		title: "Popular Science",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/225106231/original/432x574/e7397c54bf/1677698479?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/b1.pdf",
	},
	{
		id: 2,
		title: "Finding Cinderella",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/224800035/original/432x574/68c931ab97/1677698296?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/b2.pdf",
	},
	{
		id: 3,
		title: "7 habits ",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/225106231/original/432x574/e7397c54bf/1677698479?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/b3.pdf",
	},
	{
		id: 4,
		title: "live 24 hour a day",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/264710968/original/432x574/a6e2ef23f1/1659167124?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/b4.pdf",
	},
	{
		id: 5,
		title: "the science of mind",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/264190338/original/216x287/f736bad07f/1660893424?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/b5.pdf",
	},
	{
		id: 6,
		title: "Hellen Keller's story",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/271318026/original/216x287/c7eed0d766/1659169461?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/b6.pdf",
	},
	{
		id: 7,
		title: "Wealthy Thinking",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/264189662/original/216x287/9183f504c2/1659165971?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/b7.pdf",
	},
	{
		id: 8,
		title: "Public Opinion",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/264191318/original/432x574/d0e490be7d/1660893481?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/b8.pdf",
	},
	{
		id: 9,
		title: "Story of Life",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/351499629/original/216x287/f2856a2ba1/1638603493?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/b9.pdf",
	},
	{
		id: 10,
		title: "Jane's Novels",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/277810612/original/216x287/01bec6b18a/1617236170?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/b4.pdf",
	},
];

const FAKE_MAGAZINES = [
	{
		id: 1,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/631365137/original/432x574/1337674074/1680223007?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/ma1.pdf",
	},
	{
		id: 2,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/633471931/original/432x574/9387642a01/1680238592?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/ma2.pdf",
	},
	{
		id: 3,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/619874069/original/432x574/1ca68ddfae/1680114412?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/ma3.pdf",
	},
	{
		id: 4,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/626231213/original/432x574/e34df7c17d/1680015029?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/ma4.pdf",
	},
	{
		id: 5,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/631948537/original/432x574/5ed1ecefdd/1680210534?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/ma6.pdf",
	},
	{
		id: 6,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/629507999/original/432x574/9bf7d5e6bb/1680232591?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/ma7.pdf",
	},
	{
		id: 7,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/629377837/original/432x574/c6d424f0ff/1680213371?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/ma8.pdf",
	},
	{
		id: 8,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/634722629/original/432x574/56814606dd/1680245230?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/ma7.pdf",
	},
	{
		id: 9,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/630852252/original/432x574/cb155dec7b/1680150409?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/ma1.pdf",
	},
	{
		id: 10,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/633924388/original/432x574/d7434ebd10/1679992467?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/ma2.pdf",
	},
];

const FAKE_PODCASTS = [
	{
		id: 1,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/414013234/original/432x432/8a50451350/1674868061?v=1",
	},
	{
		id: 2,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/414013224/original/432x432/452408df55/1676943921?v=1",
	},
	{
		id: 3,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/414107656/original/432x432/056f2e2b97/1674888417?v=1",
	},
	{
		id: 4,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/502618451/original/432x432/9db8ba00db/1678512375?v=1",
	},
	{
		id: 5,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/501663409/original/432x432/1f0d9114ea/1667334599?v=1",
	},
	{
		id: 6,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/414106971/original/432x432/7396bacc13/1677866791?v=1",
	},
	{
		id: 7,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/589372208/original/432x432/10e4d86377/1661789835?v=1",
	},
];

const FAKE_MUSICS = [
	{
		id: 1,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/278462474/original/432x574/568c18fb99/1667833615?v=1",
		pdfLink: "",
	},
	{
		id: 2,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/269679990/original/432x574/0d03ba7bcf/1671739846?v=1",
		pdfLink: "",
	},
	{
		id: 3,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/269612695/original/432x574/a1995b888b/1655050316?v=1",
		pdfLink: "",
	},
	{
		id: 4,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/364450527/original/432x574/641fddd995/1679834541?v=1",
		pdfLink: "",
	},
	{
		id: 5,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/453575725/original/432x574/cfcf90182b/1675630030?v=1",
		pdfLink: "",
	},
	{
		id: 6,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/401392647/original/432x574/7930d849c8/1668539966?v=1",
		pdfLink: "",
	},
	{
		id: 7,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/430661784/original/432x574/dee30a948d/1673592287?v=1",
		pdfLink: "",
	},
	{
		id: 8,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/479274313/original/432x574/d3059fd35a/1635944820?v=1",
		pdfLink: "",
	},
	{
		id: 9,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/word_document/364451044/original/432x574/c8b720cdfc/1631883302?v=1",
		pdfLink: "",
	},
	{
		id: 10,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/word_document/364450759/original/432x574/724dafb7cb/1636411946?v=1",
		pdfLink: "",
	},
];

const FAKE_DOCUMENTS = [
	{
		id: 1,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/document/250032173/original/432x574/10b7515f72/1576694841?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/d1.pdf",
	},
	{
		id: 2,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/document/250032173/original/432x574/10b7515f72/1576694841?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/d2.pdf",
	},
	{
		id: 3,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/document/250032173/original/432x574/10b7515f72/1576694841?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/d3.pdf",
	},
	{
		id: 4,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/document/250032173/original/432x574/10b7515f72/1576694841?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/d4.pdf",
	},
	{
		id: 5,
		title: "",
		imageLink:
			"https://imgv2-1-f.scribdassets.com/img/document/250032173/original/432x574/10b7515f72/1576694841?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/d5.pdf",
	},
	{
		id: 6,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/document/205050491/original/432x574/52bac78e03/1391662496?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/d3.pdf",
	},
	{
		id: 7,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/document/205050491/original/432x574/52bac78e03/1391662496?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/d2.pdf",
	},
	{
		id: 8,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/document/205050491/original/432x574/52bac78e03/1391662496?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/d1.pdf",
	},
	{
		id: 9,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/document/205050491/original/432x574/52bac78e03/1391662496?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/d5.pdf",
	},
	{
		id: 10,
		title: "",
		imageLink:
			"https://imgv2-2-f.scribdassets.com/img/document/205050491/original/432x574/52bac78e03/1391662496?v=1",
		pdfLink: "http://localhost:5000/v1/resource/download/d4.pdf",
	},
];

export {
	FAKE_BOOKS,
	FAKE_DOCUMENTS,
	FAKE_PODCASTS,
	FAKE_MAGAZINES,
	FAKE_MUSICS,
};
