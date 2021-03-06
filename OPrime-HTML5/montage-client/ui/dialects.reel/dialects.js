/**
 * @module ui/dialects.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Dialects
 * @extends Component
 */
exports.Dialects = Component.specialize( /** @lends Dialects# */ {
	constructor: {
		value: function Dialects() {
			this.super();
			this.content = this.defaultList;
		}
	},

	enterDocument: {
		value: function(firstTime) {
			this.super(firstTime);

			if (firstTime) {
				var rangeController = this.templateObjects.rangeController;
				//Observe the selection for changes

				// rangeController.content = this.content;
				var self = this;
				if (this.content) {
					this.content.map(function(dialect) {
						if (self.selectedIso) {
							if (self.selectedIso === dialect.iso) {
								self.templateObjects.select.value = dialect;
								self.handleChange();
							}
						} else if (dialect.selected) {
							self.templateObjects.select.value = dialect;
							self.handleChange();
						}
					});
				}
			}
			this.element.addEventListener("change", this, false);
		}
	},

	handleChange: {
		value: function() {
			// console.log("handleChange", this.templateObjects.select.value);
			if (this.value !== this.templateObjects.select.value) {
				this.value = this.templateObjects.select.value;
				if (this.globalKey) {

					this.application[this.globalKey].iso = this.value.iso;
					this.application[this.globalKey].name = this.value.name;
					this.application[this.globalKey].nativeName = this.value.nativeName;

					var changeDialectEvent = document.createEvent("CustomEvent");
					changeDialectEvent.initCustomEvent("change" + this.globalKey, true, true, null);
					this.dispatchEvent(changeDialectEvent);
				}
			}
			console.log("Dialects handleChange", this.value);
		}
	},

	value: {
		value: null
	},


	defaultList: {
		value: [{
			"iso": "ab",
			"name": "Abkhaz",
			"nativeName": "аҧсуа"
		}, {
			"iso": "aa",
			"name": "Afar",
			"nativeName": "Afaraf"
		}, {
			"iso": "af",
			"name": "Afrikaans",
			"nativeName": "Afrikaans"
		}, {
			"iso": "ak",
			"name": "Akan",
			"nativeName": "Akan"
		}, {
			"iso": "sq",
			"name": "Albanian",
			"nativeName": "Shqip"
		}, {
			"iso": "am",
			"name": "Amharic",
			"nativeName": "አማርኛ"
		}, {
			"iso": "ar",
			"name": "Arabic",
			"nativeName": "العربية"
		}, {
			"iso": "an",
			"name": "Aragonese",
			"nativeName": "Aragonés"
		}, {
			"iso": "hy",
			"name": "Armenian",
			"nativeName": "Հայերեն"
		}, {
			"iso": "as",
			"name": "Assamese",
			"nativeName": "অসমীয়া"
		}, {
			// 	"iso": "av",
			// 	"name": "Avaric",
			// 	"nativeName": "авар мацӀ, магӀарул мацӀ"
			// }, {
			"iso": "ae",
			"name": "Avestan",
			"nativeName": "avesta"
		}, {
			"iso": "ay",
			"name": "Aymara",
			"nativeName": "aymar aru"
		}, {
			"iso": "az",
			"name": "Azerbaijani",
			"nativeName": "azərbaycan dili"
		}, {
			"iso": "bm",
			"name": "Bambara",
			"nativeName": "bamanankan"
		}, {
			"iso": "ba",
			"name": "Bashkir",
			"nativeName": "башҡорт теле"
		}, {
			"iso": "eu",
			"name": "Basque",
			"nativeName": "euskara"
		}, {
			"iso": "be",
			"name": "Belarusian",
			"nativeName": "Беларуская"
		}, {
			"iso": "bn",
			"name": "Bengali",
			"nativeName": "বাংলা"
		}, {
			"iso": "bh",
			"name": "Bihari",
			"nativeName": "भोजपुरी"
		}, {
			"iso": "bi",
			"name": "Bislama",
			"nativeName": "Bislama"
		}, {
			"iso": "bs",
			"name": "Bosnian",
			"nativeName": "bosanski jezik"
		}, {
			"iso": "br",
			"name": "Breton",
			"nativeName": "brezhoneg"
		}, {
			"iso": "bg",
			"name": "Bulgarian",
			"nativeName": "български език"
		}, {
			"iso": "my",
			"name": "Burmese",
			"nativeName": "ဗမာစာ"
		}, {
			"iso": "ca",
			"name": "Catalan; Valencian",
			"nativeName": "Català"
		}, {
			"iso": "ch",
			"name": "Chamorro",
			"nativeName": "Chamoru"
		}, {
			"iso": "ce",
			"name": "Chechen",
			"nativeName": "нохчийн мотт"
		}, {
			"iso": "ny",
			"name": "Chichewa; Chewa; Nyanja",
			"nativeName": "chiCheŵa, chinyanja"
		}, {
			"iso": "zh",
			"name": "Chinese",
			"nativeName": "中文"
		}, {
			"iso": "cv",
			"name": "Chuvash",
			"nativeName": "чӑваш чӗлхи"
		}, {
			"iso": "kw",
			"name": "Cornish",
			"nativeName": "Kernewek"
		}, {
			"iso": "co",
			"name": "Corsican",
			"nativeName": "corsu"
		}, {
			"iso": "cr",
			"name": "Cree",
			"nativeName": "ᓀᐦᐃᔭᐍᐏᐣ"
		}, {
			"iso": "hr",
			"name": "Croatian",
			"nativeName": "hrvatski"
		}, {
			"iso": "cs",
			"name": "Czech",
			"nativeName": "česky"
		}, {
			"iso": "da",
			"name": "Danish",
			"nativeName": "dansk"
		}, {
			// 	"iso": "dv",
			// 	"name": "Divehi; Dhivehi; Maldivian;",
			// 	"nativeName": "ދިވެހި"
			// }, {
			"iso": "nl",
			"name": "Dutch",
			"nativeName": "Nederlands, Vlaams"
		}, {
			"iso": "en",
			"name": "English",
			"nativeName": "English",
			"selected": true
		}, {
			"iso": "eo",
			"name": "Esperanto",
			"nativeName": "Esperanto"
		}, {
			"iso": "et",
			"name": "Estonian",
			"nativeName": "eesti"
		}, {
			"iso": "ee",
			"name": "Ewe",
			"nativeName": "Eʋegbe"
		}, {
			"iso": "fo",
			"name": "Faroese",
			"nativeName": "føroyskt"
		}, {
			"iso": "fj",
			"name": "Fijian",
			"nativeName": "vosa Vakaviti"
		}, {
			"iso": "fi",
			"name": "Finnish",
			"nativeName": "suomi"
		}, {
			"iso": "fr",
			"name": "French",
			"nativeName": "français"
		}, {
			// 	"iso": "ff",
			// 	"name": "Fula; Fulah; Pulaar; Pular",
			// 	"nativeName": "Fulfulde, Pulaar, Pular"
			// }, {
			"iso": "gl",
			"name": "Galician",
			"nativeName": "Galego"
		}, {
			"iso": "ka",
			"name": "Georgian",
			"nativeName": "ქართული"
		}, {
			"iso": "de",
			"name": "German",
			"nativeName": "Deutsch"
		}, {
			"iso": "el",
			"name": "Greek, Modern",
			"nativeName": "Ελληνικά"
		}, {
			"iso": "gn",
			"name": "Guaraní",
			"nativeName": "Avañeẽ"
		}, {
			"iso": "gu",
			"name": "Gujarati",
			"nativeName": "ગુજરાતી"
		}, {
			"iso": "ht",
			"name": "Haitian; Haitian Creole",
			"nativeName": "Kreyòl ayisyen"
		}, {
			"iso": "ha",
			"name": "Hausa",
			"nativeName": "Hausa, هَوُسَ"
		}, {
			"iso": "he",
			"name": "Hebrew (modern)",
			"nativeName": "עברית"
		}, {
			"iso": "hz",
			"name": "Herero",
			"nativeName": "Otjiherero"
		}, {
			"iso": "hi",
			"name": "Hindi",
			"nativeName": "हिन्दी, हिंदी"
		}, {
			"iso": "ho",
			"name": "Hiri Motu",
			"nativeName": "Hiri Motu"
		}, {
			"iso": "hu",
			"name": "Hungarian",
			"nativeName": "Magyar"
		}, {
			"iso": "ia",
			"name": "Interlingua",
			"nativeName": "Interlingua"
		}, {
			"iso": "id",
			"name": "Indonesian",
			"nativeName": "Bahasa Indonesia"
		}, {
			// "iso": "ie",
			// "name": "Interlingue",
			// "nativeName": "Originally called Occidental; then Interlingue after WWII"
		}, {
			"iso": "ga",
			"name": "Irish",
			"nativeName": "Gaeilge"
		}, {
			"iso": "ig",
			"name": "Igbo",
			"nativeName": "Asụsụ Igbo"
		}, {
			"iso": "ik",
			"name": "Inupiaq",
			"nativeName": "Iñupiaq, Iñupiatun"
		}, {
			"iso": "io",
			"name": "Ido",
			"nativeName": "Ido"
		}, {
			"iso": "is",
			"name": "Icelandic",
			"nativeName": "Íslenska"
		}, {
			"iso": "it",
			"name": "Italian",
			"nativeName": "Italiano"
		}, {
			"iso": "iu",
			"name": "Inuktitut",
			"nativeName": "ᐃᓄᒃᑎᑐᑦ"
		}, {
			"iso": "ja",
			"name": "Japanese",
			"nativeName": "日本語"
		}, {
			"iso": "jv",
			"name": "Javanese",
			"nativeName": "basa Jawa"
		}, {
			"iso": "kl",
			"name": "Kalaallisut, Greenlandic",
			"nativeName": "kalaallisut"
		}, {
			"iso": "kn",
			"name": "Kannada",
			"nativeName": "ಕನ್ನಡ"
		}, {
			"iso": "kr",
			"name": "Kanuri",
			"nativeName": "Kanuri"
		}, {
			"iso": "ks",
			"name": "Kashmiri",
			"nativeName": "कश्मीरी, كشميري‎"
		}, {
			"iso": "kk",
			"name": "Kazakh",
			"nativeName": "Қазақ тілі"
		}, {
			"iso": "km",
			"name": "Khmer",
			"nativeName": "ភាសាខ្មែរ"
		}, {
			"iso": "ki",
			"name": "Kikuyu, Gikuyu",
			"nativeName": "Gĩkũyũ"
		}, {
			"iso": "rw",
			"name": "Kinyarwanda",
			"nativeName": "Ikinyarwanda"
		}, {
			"iso": "ky",
			"name": "Kirghiz, Kyrgyz",
			"nativeName": "кыргыз тили"
		}, {
			"iso": "kv",
			"name": "Komi",
			"nativeName": "коми кыв"
		}, {
			"iso": "kg",
			"name": "Kongo",
			"nativeName": "KiKongo"
		}, {
			"iso": "ko",
			"name": "Korean",
			"nativeName": "한국어"
		}, {
			"iso": "ku",
			"name": "Kurdish",
			"nativeName": "Kurdî, كوردی‎"
		}, {
			"iso": "kj",
			"name": "Kwanyama, Kuanyama",
			"nativeName": "Kuanyama"
		}, {
			"iso": "la",
			"name": "Latin",
			"nativeName": "latine"
		}, {
			"iso": "lb",
			"name": "Luxembourgish, Letzeburgesch",
			"nativeName": "Lëtzebuergesch"
		}, {
			"iso": "lg",
			"name": "Luganda",
			"nativeName": "Luganda"
		}, {
			"iso": "li",
			"name": "Limburgish, Limburgan, Limburger",
			"nativeName": "Limburgs"
		}, {
			"iso": "ln",
			"name": "Lingala",
			"nativeName": "Lingála"
		}, {
			"iso": "lo",
			"name": "Lao",
			"nativeName": "ພາສາລາວ"
		}, {
			"iso": "lt",
			"name": "Lithuanian",
			"nativeName": "lietuvių kalba"
		}, {
			"iso": "lu",
			"name": "Luba-Katanga",
			"nativeName": ""
		}, {
			"iso": "lv",
			"name": "Latvian",
			"nativeName": "latviešu valoda"
		}, {
			"iso": "gv",
			"name": "Manx",
			"nativeName": "Gaelg, Gailck"
		}, {
			"iso": "mk",
			"name": "Macedonian",
			"nativeName": "македонски јазик"
		}, {
			"iso": "mg",
			"name": "Malagasy",
			"nativeName": "Malagasy fiteny"
		}, {
			"iso": "ms",
			"name": "Malay",
			"nativeName": "bahasa Melayu"
		}, {
			"iso": "ml",
			"name": "Malayalam",
			"nativeName": "മലയാളം"
		}, {
			"iso": "mt",
			"name": "Maltese",
			"nativeName": "Malti"
		}, {
			"iso": "mi",
			"name": "Māori",
			"nativeName": "te reo Māori"
		}, {
			"iso": "mr",
			"name": "Marathi (Marāṭhī)",
			"nativeName": "मराठी"
		}, {
			"iso": "mh",
			"name": "Marshallese",
			"nativeName": "Kajin M̧ajeļ"
		}, {
			"iso": "mn",
			"name": "Mongolian",
			"nativeName": "монгол"
		}, {
			"iso": "na",
			"name": "Nauru",
			"nativeName": "Ekakairũ Naoero"
		}, {
			"iso": "nv",
			"name": "Navajo, Navaho",
			"nativeName": "Diné bizaad, Dinékʼehǰí"
		}, {
			"iso": "nb",
			"name": "Norwegian Bokmål",
			"nativeName": "Norsk bokmål"
		}, {
			"iso": "nd",
			"name": "North Ndebele",
			"nativeName": "isiNdebele"
		}, {
			"iso": "ne",
			"name": "Nepali",
			"nativeName": "नेपाली"
		}, {
			"iso": "ng",
			"name": "Ndonga",
			"nativeName": "Owambo"
		}, {
			"iso": "nn",
			"name": "Norwegian Nynorsk",
			"nativeName": "Norsk nynorsk"
		}, {
			"iso": "no",
			"name": "Norwegian",
			"nativeName": "Norsk"
		}, {
			"iso": "ii",
			"name": "Nuosu",
			"nativeName": "ꆈꌠ꒿ Nuosuhxop"
		}, {
			"iso": "nr",
			"name": "South Ndebele",
			"nativeName": "isiNdebele"
		}, {
			"iso": "oc",
			"name": "Occitan",
			"nativeName": "Occitan"
		}, {
			"iso": "oj",
			"name": "Ojibwe, Ojibwa",
			"nativeName": "ᐊᓂᔑᓈᐯᒧᐎᓐ"
		}, {
			// 	"iso": "cu",
			// 	"name": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
			// 	"nativeName": "ѩзыкъ словѣньскъ"
			// }, {
			"iso": "om",
			"name": "Oromo",
			"nativeName": "Afaan Oromoo"
		}, {
			"iso": "or",
			"name": "Oriya",
			"nativeName": "ଓଡ଼ିଆ"
		}, {
			"iso": "os",
			"name": "Ossetian, Ossetic",
			"nativeName": "ирон æвзаг"
		}, {
			"iso": "pa",
			"name": "Panjabi, Punjabi",
			"nativeName": "ਪੰਜਾਬੀ, پنجابی‎"
		}, {
			"iso": "pi",
			"name": "Pāli",
			"nativeName": "पाऴि"
		}, {
			"iso": "fa",
			"name": "Persian",
			"nativeName": "فارسی"
		}, {
			"iso": "pl",
			"name": "Polish",
			"nativeName": "polski"
		}, {
			"iso": "ps",
			"name": "Pashto, Pushto",
			"nativeName": "پښتو"
		}, {
			"iso": "pt",
			"name": "Portuguese",
			"nativeName": "Português"
		}, {
			"iso": "qu",
			"name": "Quechua",
			"nativeName": "Runa Simi, Kichwa"
		}, {
			"iso": "rm",
			"name": "Romansh",
			"nativeName": "rumantsch grischun"
		}, {
			"iso": "rn",
			"name": "Kirundi",
			"nativeName": "kiRundi"
		}, {
			"iso": "ro",
			"name": "Romanian, Moldavian, Moldovan",
			"nativeName": "română"
		}, {
			"iso": "ru",
			"name": "Russian",
			"nativeName": "русский язык"
		}, {
			"iso": "sa",
			"name": "Sanskrit (Saṁskṛta)",
			"nativeName": "संस्कृतम्"
		}, {
			"iso": "sc",
			"name": "Sardinian",
			"nativeName": "sardu"
		}, {
			"iso": "sd",
			"name": "Sindhi",
			"nativeName": "सिन्धी, سنڌي، سندھی‎"
		}, {
			"iso": "se",
			"name": "Northern Sami",
			"nativeName": "Davvisámegiella"
		}, {
			"iso": "sm",
			"name": "Samoan",
			"nativeName": "gagana faa Samoa"
		}, {
			"iso": "sg",
			"name": "Sango",
			"nativeName": "yângâ tî sängö"
		}, {
			"iso": "sr",
			"name": "Serbian",
			"nativeName": "српски језик"
		}, {
			"iso": "gd",
			"name": "Scottish Gaelic; Gaelic",
			"nativeName": "Gàidhlig"
		}, {
			"iso": "sn",
			"name": "Shona",
			"nativeName": "chiShona"
		}, {
			"iso": "si",
			"name": "Sinhala, Sinhalese",
			"nativeName": "සිංහල"
		}, {
			"iso": "sk",
			"name": "Slovak",
			"nativeName": "slovenčina"
		}, {
			"iso": "sl",
			"name": "Slovene",
			"nativeName": "slovenščina"
		}, {
			"iso": "so",
			"name": "Somali",
			"nativeName": "Soomaaliga, af Soomaali"
		}, {
			"iso": "st",
			"name": "Southern Sotho",
			"nativeName": "Sesotho"
		}, {
			"iso": "es",
			"name": "Spanish; Castilian",
			"nativeName": "español, castellano"
		}, {
			"iso": "su",
			"name": "Sundanese",
			"nativeName": "Basa Sunda"
		}, {
			"iso": "sw",
			"name": "Swahili",
			"nativeName": "Kiswahili"
		}, {
			"iso": "ss",
			"name": "Swati",
			"nativeName": "SiSwati"
		}, {
			"iso": "sv",
			"name": "Swedish",
			"nativeName": "svenska"
		}, {
			"iso": "ta",
			"name": "Tamil",
			"nativeName": "தமிழ்"
		}, {
			"iso": "te",
			"name": "Telugu",
			"nativeName": "తెలుగు"
		}, {
			"iso": "tg",
			"name": "Tajik",
			"nativeName": "тоҷикӣ, toğikī, تاجیکی‎"
		}, {
			"iso": "th",
			"name": "Thai",
			"nativeName": "ไทย"
		}, {
			"iso": "ti",
			"name": "Tigrinya",
			"nativeName": "ትግርኛ"
		}, {
			"iso": "bo",
			"name": "Tibetan Standard, Tibetan, Central",
			"nativeName": "བོད་ཡིག"
		}, {
			"iso": "tk",
			"name": "Turkmen",
			"nativeName": "Türkmen, Түркмен"
		}, {
			// 	"iso": "tl",
			// 	"name": "Tagalog",
			// 	"nativeName": "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"
			// }, {
			"iso": "tn",
			"name": "Tswana",
			"nativeName": "Setswana"
		}, {
			"iso": "to",
			"name": "Tonga (Tonga Islands)",
			"nativeName": "faka Tonga"
		}, {
			"iso": "tr",
			"name": "Turkish",
			"nativeName": "Türkçe"
		}, {
			"iso": "ts",
			"name": "Tsonga",
			"nativeName": "Xitsonga"
		}, {
			"iso": "tt",
			"name": "Tatar",
			"nativeName": "татарча, tatarça, تاتارچا‎"
		}, {
			"iso": "tw",
			"name": "Twi",
			"nativeName": "Twi"
		}, {
			"iso": "ty",
			"name": "Tahitian",
			"nativeName": "Reo Tahiti"
		}, {
			"iso": "ug",
			"name": "Uighur, Uyghur",
			"nativeName": "Uyƣurqə, ئۇيغۇرچە‎"
		}, {
			"iso": "uk",
			"name": "Ukrainian",
			"nativeName": "українська"
		}, {
			"iso": "ur",
			"name": "Urdu",
			"nativeName": "اردو"
		}, {
			"iso": "uz",
			"name": "Uzbek",
			"nativeName": "zbek, Ўзбек, أۇزبېك‎"
		}, {
			"iso": "ve",
			"name": "Venda",
			"nativeName": "Tshivenḓa"
		}, {
			"iso": "vi",
			"name": "Vietnamese",
			"nativeName": "Tiếng Việt"
		}, {
			"iso": "vo",
			"name": "Volapük",
			"nativeName": "Volapük"
		}, {
			"iso": "wa",
			"name": "Walloon",
			"nativeName": "Walon"
		}, {
			"iso": "cy",
			"name": "Welsh",
			"nativeName": "Cymraeg"
		}, {
			"iso": "wo",
			"name": "Wolof",
			"nativeName": "Wollof"
		}, {
			"iso": "fy",
			"name": "Western Frisian",
			"nativeName": "Frysk"
		}, {
			"iso": "xh",
			"name": "Xhosa",
			"nativeName": "isiXhosa"
		}, {
			"iso": "yi",
			"name": "Yiddish",
			"nativeName": "ייִדיש"
		}, {
			"iso": "yo",
			"name": "Yoruba",
			"nativeName": "Yorùbá"
		}, {
			"iso": "za",
			"name": "Zhuang, Chuang",
			"nativeName": "Saɯ cueŋƅ, Saw cuengh"
		}]
	},
});
