let ytOptionLayer = (function () {
	function ytOptionLayer () {
		let s = this;
		LExtends(s, LSprite, []);

		s.carIndex = 0;
		s.placeIndex = 0;

		s.carInfoList = [
			{name : "", data : 0},
		];

		s.placeInfoList = [
			{name : "Forest", data : "street_canyon"},
		];

		let backgroundBmp = new LBitmap(dataList["default_menu_background"]);
		backgroundBmp.scaleX = LGlobal.width / backgroundBmp.getWidth();
		backgroundBmp.scaleY = LGlobal.height / backgroundBmp.getHeight();
		s.addChild(backgroundBmp);

		s.carOptionLayer = new LSprite();
		s.addChild(s.carOptionLayer);

		s.placeOptionLayer = new LSprite();
		s.addChild(s.placeOptionLayer);

		s.addCarOption();
	}

	ytOptionLayer.prototype.addCarOption = function () {
		let s = this, carInfoList = s.carInfoList;

		let carBmpd = dataList["menu_car_icons"].clone();
		carBmpd.setProperties(0, 0, carBmpd.width / 2, carBmpd.height / 6);

		for (let k = 0; k < carInfoList.length; k++) {
			let o = carInfoList[k];

			let contentLayer = new LSprite();

			let cBmpd = carBmpd.clone();
			cBmpd.setCoordinate(0, o.data * carBmpd.height);
			var iconBmp = new LBitmap(cBmpd);
			iconBmp.scaleX = iconBmp.scaleY = 0.5;
			contentLayer.addChild(iconBmp);

			let txt = new LTextField();
			txt.text = o.name;
			txt.size = 13;
			txt.color = "white";
			txt.weight = "bold";
			txt.filters = [new LDropShadowFilter(null, null, "white", 15)];
			txt.x = iconBmp.getWidth() + 5;
			txt.y = (iconBmp.getHeight() - txt.getHeight()) / 2;
			contentLayer.addChild(txt);

			contentLayer.x = 20;

			let btn = new ytButton(2, [contentLayer, null, "middle"], [0.85, 0.9]);
			btn.index = k;
			btn.y = k * (btn.getHeight() + 10);
			s.carOptionLayer.addChild(btn);

			btn.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
				s.carIndex = e.currentTarget.index;

				s.carOptionLayer.removeAllChild();

				s.addPlaceOption();
			});
		}

		s.carOptionLayer.x = (LGlobal.width - s.carOptionLayer.getWidth()) * 0.5;
		s.carOptionLayer.y = (LGlobal.height - s.carOptionLayer.getHeight()) * 0.5;
	};

	ytOptionLayer.prototype.addPlaceOption = function () {
		let s = this, placeInfoList = s.placeInfoList;		

		for (let k = 0; k < placeInfoList.length; k++) {
			let o = placeInfoList[k];

			let contentLayer = new LSprite();

			let cBmpd = dataList[o.data].clone();
			cBmpd.setProperties(0, 0, cBmpd.width, cBmpd.width);
			let iconBmp = new LBitmap(cBmpd);
			iconBmp.scaleX = iconBmp.scaleY = 0.08;
			contentLayer.addChild(iconBmp);

			let txt = new LTextField();
			txt.text = o.name;
			txt.size = 15;
			txt.color = "white";
			txt.weight = "bold";
			txt.filters = [new LDropShadowFilter(null, null, "white", 15)];
			txt.x = iconBmp.getWidth() + 20;
			txt.y = (iconBmp.getHeight() - txt.getHeight()) / 2;
			contentLayer.addChild(txt);

			contentLayer.x = 20;

			let btn = new ytButton(2, [contentLayer, null, "middle"], [0.6, 0.6]);
			btn.index = k;
			btn.y = k * (btn.getHeight() + 10);
			s.placeOptionLayer.addChild(btn);

			btn.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
				s.placeIndex = e.currentTarget.index;

				s.remove();

				addGameInterface(s.carIndex, s.placeInfoList[s.placeIndex].data);
			});
		}

		s.placeOptionLayer.x = (LGlobal.width - s.placeOptionLayer.getWidth()) * 0.5;
		s.placeOptionLayer.y = (LGlobal.height - s.placeOptionLayer.getHeight()) * 0.5;
	};

	return ytOptionLayer;
})();