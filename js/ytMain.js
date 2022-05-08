LInit(30, "mylegend", 400, 600, main);  // Розмір карти //

let dataList = {};

function main () {
	LGlobal.aspectRatio = PORTRAIT;
	
	LGlobal.setDebug(false);

	let b = document.body;   // Фон для меню //
	b.style.margin = "0px";
	b.style.padding = "0px";
	b.style.backgroundColor = "black";

	if (LGlobal.mobile) {
		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	}
	LGlobal.screen(LGlobal.FULL_SCREEN);

	loadGame();
}

function loadGame () {
	let loadData = [
		[
			{path : "./js/ytPreloader.js"},

			{name : "preloader_bar", path : "./images/preloader_bar.jpg"},
			{name : "preloader_bar_background", path : "./images/preloader_bar_background.jpg"},
			{name : "preloader_background", path : "./images/preloader_background.jpg"}
		],
		[
			{path : "./js/ytButton.js"},
			{path : "./js/ytMenuLayer.js"},
			{path : "./js/ytOptionLayer.js"},
			{path : "./js/ytGameLayer.js"},
			{path : "./js/ytBackground.js"},
			{path : "./js/ytStreetView.js"},
			{path : "./js/ytCar.js"},
			{path : "./js/ytCarLayer.js"},
			{path : "./js/ytExplosion.js"},
			{path : "./js/ytPoint.js"},
			{path : "./js/ytResultBox.js"},
			{path : "./js/ytHelpLayer.js"},
			{path : "./js/ytAboutLayer.js"},

			{name : "button_sheet", path : "./images/button_sheet.jpg"},
			{name : "menu_car_icons", path : "./images/menu_car_icons.png"},
			{name : "explosion", path : "./images/explosion.png"},
			{name : "cars_atlas", path : "./images/cars_atlas.png"},
			{name : "button_pause_sheet", path : "./images/button_pause_sheet.png"},
			{name : "default_menu_background", path : "./images/default_menu_background.jpg"},
			{name : "misc_atlas", path : "./images/misc_atlas.png"},
			{name : "numbers", path : "./images/numbers.png"},
			{name : "street_canyon", path : "./images/street_canyon.jpg"},
			{name : "street_city", path : "./images/street_city.jpg"},
			{name : "street_desert", path : "./images/street_desert.jpg"},
			{name : "street_grass", path : "./images/street_grass.jpg"},
			{name : "street_snow", path : "./images/street_snow.jpg"},
			{name : "street_water", path : "./images/street_water.jpg"},
			{name : "help", path : "./images/help.jpg"}
		]
	];

	LLoadManage.load(
		loadData[0],
		null,
		function (r) {
			updateDataList(r);

			let preloader = new ytPreloader();
			addChild(preloader);

			LLoadManage.load(
				loadData[1],
				function (p) {
					preloader.setProgress(p);
				},
				function (r) {
					updateDataList(r);

					preloader.remove();

					addMenuInterface();
				}
			);
		}
	);
}

function updateDataList (r) {
	for (let k in r) {
		let o = r[k];

		if (o instanceof Image) {
			dataList[k] = new LBitmapData(o);
		} else {
			dataList[k] = o;
		}
	}
}

function addMenuInterface () {
	let menuInterface = new ytMenuLayer();
	addChild(menuInterface);
}

function addOptionInterface() {
	let optionInterface = new ytOptionLayer();
	addChild(optionInterface);
}

function addGameInterface (car, place) {
	let gameInterface = new ytGameLayer(car, place);
	addChild(gameInterface);
}

function addHelpInterface() {
	let helpInterface = new ytHelpLayer();
	addChild(helpInterface);
}

function addAboutInterface() {
	let aboutInterface = new ytAboutLayer();
	addChild(aboutInterface);
}