(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-wallet-wallet"],{"0b41":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-7db74d20]{background:#070219}.container[data-v-7db74d20]{padding:%?40?% %?26?%}.assets-box[data-v-7db74d20]{width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:%?30?%}.assets-box .title[data-v-7db74d20]{font-size:%?36?%;font-weight:400;color:#fff;line-height:%?30?%}.assets-box .money[data-v-7db74d20]{font-size:%?56?%;font-family:PingFang SC;font-weight:500;color:#fefeff;margin-top:%?80?%}.assets-box .tips[data-v-7db74d20]{font-size:%?24?%;font-family:PingFang SC;font-weight:400;color:#757d89;margin-top:%?18?%}.menu[data-v-7db74d20]{margin-top:%?47?%;display:flex;justify-content:space-between;font-size:%?28?%;color:#ebeef5;font-weight:700}.menu .fiat[data-v-7db74d20]{width:%?330?%;height:%?110?%;display:flex;flex:1;align-items:center;background:#1a1b28;border-radius:%?10?%;padding:0 %?45?%;justify-content:space-between}.menu .fiat .label[data-v-7db74d20]{display:flex;flex-direction:column;padding-left:%?20?%}.menu .fiat .sub[data-v-7db74d20]{font-size:%?24?%;font-weight:400}.menu .fiat .menu-icon[data-v-7db74d20]{width:%?58?%}.menu .fiat uni-text[data-v-7db74d20]{font-size:%?30?%}.menu .m-r[data-v-7db74d20]{margin-right:%?14?%}.menu .m-l[data-v-7db74d20]{margin-left:%?14?%}.trade-title[data-v-7db74d20]{font-size:%?24?%;font-family:PingFang SC;font-weight:400;color:#8a959f;margin:%?34?% 0 %?28?% 0}.trade-list[data-v-7db74d20]{padding:%?20?% %?40?%;background-color:#1a1a1a;border-bottom:%?1?% solid #303030}.trade-list .trade-money[data-v-7db74d20]{width:100%;display:flex;justify-content:space-between}.trade-list .trade-money uni-text[data-v-7db74d20]{font-size:%?30?%;font-family:PingFang SC;font-weight:400;color:#fff}.trade-list .trade-time[data-v-7db74d20]{width:100%;display:flex;margin-top:%?4?%;justify-content:space-between}.trade-list .trade-time uni-text[data-v-7db74d20]{font-size:%?24?%;font-family:PingFang SC;font-weight:400;color:#5c6672}body.?%PAGE?%[data-v-7db74d20]{background:#070219}',""]),t.exports=e},3431:function(t,e,n){"use strict";var i=n("66c3"),a=n.n(i);a.a},"66c3":function(t,e,n){var i=n("0b41");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("58989310",i,!0,{sourceMap:!1,shadowMode:!1})},"85e5":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAtCAYAAADV2ImkAAAAAXNSR0IArs4c6QAABQFJREFUaEPtmXvo32MUx1/vuTYbEUJiiBHN/nApuU1b5jIsS8uQWI2RS+6KkSkrkyWj5R4hWaMNk1vmDyVFUVbDLHInwsI4eq/z+Xl89v19v5/vZfPPzl+/7+/zPOe8nvM5z3nOeT5iwBIRRwM7p9q3JH03SBMapDLriog3gONS7wRJ/j0w2Qy82cO1YNocEv9bSETEVsA6SdHNFu8XOCL81reU9Gcruy1DIic9DvwMzO4Guh/gtLsQ2AmY3srucMDzgGtzhfd3A90rcAF7UdqdL+nqupc3AI6IU4ClxcCHgQuberlX4Dx0HrCtwvbpkp4vof8DHBE7AiuBXXLQq8CJkv5qGsd9Am8BLLPNtPc9cICkHyr7deB7gEvz4TfAOElfN4UdxNEcEXbW+8Duafc+SbM3AI6IvYGPAa/ScrakJ7uBHQRw6jgLeDpt++3ay5/495CHI2IBcFkOehs4qmnclovqJyRqelYArvwsCyVdMgQcEdsADoHtc8AUSeXGa+zoAQKfBLyQhp1ed5O0dr2HI2IqsDgfrgHGNPFuRIyX9F5TD2d8IunbTh7INLcK2DfHTpP0bAXsXDsrH8yTdH0DhRf7VQE3SLqjGj+chxP2tRx3QkPo24Ebc86DkmZWwB8BY/PBRElOZ8NKREwDnikGDEG3Ai5gD8k5zgKHSVrXwc7xwOs5ZpWk/ZXxuzY34N/AaEm/dVC0A/AycEQdug4MfAjYsxWsbZwn6YkGb3Fb4Jcic40y8MHABzl5taR9OinKuG8JDUwuWiTvjdt6gS1CzKm2iuPxBi7dvkLSsU2A20B/ClSLLv9u7NnaJnZImNEy0cCnA0vyH0slTWkK3Aa6rqIn2NRvNjNaphr4NOC5/McySad2A9wAumfY4YDLkPA9wjHdAreB7gs29ZbXButDotx0ayS5puhJIqLciH3DJnC56cZVac1pbIQPPR/PkpxKepKEfhG4t0nqamckIkZm11MVZCOrg8NpzZ62TJL0Sk+0OSkiRkiyh/uSiJiQOdx6Vko6sNXRfJekq/qyNKDJEeEj/7pUt0jSrArYqaxqRb4A9hqEh/rhzuJntVlSz1RJSypgt/TuLNwiWc6UVFVv/djteW5ElE50ebmrpN/LAv5OoAqFd4Ajm5SYPRO1mZjedRNR1SoLJF3hKSXwnoDbEHvbcr6kRzcGUCedETED8L2IxRXdfpJcp/8L7B8RUXrZHeuhkhzTm0wiYg/ATUHVuQ95txWwWyTXxlXH+mamuT82BXFEbA28BDidWbyvxkr6qbLf6iJlErC88P5T2UF3dcfW7QIzbh8DzinmTpZkliEZ7qpqDnBLMc4tt4vujeLp9OxDgGO3krmSbqovvN1loK+NLigmODxmSPq8W++1G58x6+6jqnk9/BHbbnwZmBvQ5/eiGrQ34jVW2G/KyxA4F5hffHWqYGcOdz3W9gY+lfq1ODzKse8CPjYXd3sius4AzgDcmR9eeN97ZC4wp50zGn0yiIiJgDdElT0qO1/mlZI3hmvpllVeRIzKWxxv6OmAU1cp1uO878a2rTQCzhAZDdwMXF4cLnXlju/PstP1M4O6vvah1Ep8y+4LyFsl+fjtKI2BK025Sa7M2PZNeS/yI+CscHe3m7hr4ALcR7hf8cnZ1h9U3B/UF+EbSB9Ibnd8MCwf7htGp9X3DFxXnB9xxmR8bpfPfwW+co3SK2Ddzj9i6knKXh7EvQAAAABJRU5ErkJggg=="},8620:function(t,e,n){"use strict";n.r(e);var i=n("c7d8"),a=n("cc77");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("3431");var s,d=n("f0c5"),c=Object(d["a"])(a["default"],i["b"],i["c"],!1,null,"7db74d20",null,!1,i["a"],s);e["default"]=c.exports},c7d8:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"assets-box"},[i("v-uni-view",{staticClass:"title"},[t._v(t._s(t.i18n.wallet.title))]),i("v-uni-view",{staticClass:"money"},[t._v(t._s(t.userData.balance))]),i("v-uni-view",{staticClass:"tips"},[t._v(t._s(t.i18n.wallet.balance)+"(USDT)")])],1),i("v-uni-view",{staticClass:"menu"},[i("v-uni-view",{staticClass:"fiat m-r",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/wallet/recharge")}}},[i("v-uni-view",{staticClass:"label"},[i("v-uni-text",[t._v(t._s(t.i18n.wallet.recharge))])],1),i("v-uni-image",{staticClass:"menu-icon",attrs:{src:n("85e5"),mode:"widthFix"}})],1),i("v-uni-view",{staticClass:"fiat m-l",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo("/pages/wallet/withdraw")}}},[i("v-uni-view",{staticClass:"label"},[i("v-uni-text",[t._v(t._s(t.i18n.wallet.withdraw))])],1),i("v-uni-image",{staticClass:"menu-icon",attrs:{src:n("fa81"),mode:"widthFix"}})],1)],1),i("v-uni-view",{staticClass:"trade-title"},[t._v(t._s(t.i18n.wallet.tradeList))]),i("v-uni-view",{staticClass:"trade-list-wrapper"},t._l(t.tradeList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"trade-list"},[i("v-uni-view",{staticClass:"trade-money"},[i("v-uni-text",[t._v(t._s(e.description))]),"out"==e.atype?i("v-uni-text",[t._v("- "+t._s(e.amount))]):i("v-uni-text",[t._v(t._s(e.amount))])],1),i("v-uni-view",{staticClass:"trade-time"},[i("v-uni-text",[t._v(t._s(e.cdate))]),i("v-uni-text",[t._v("USDT")])],1)],1)})),1)],1)},o=[]},cc77:function(t,e,n){"use strict";n.r(e);var i=n("d179"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},d179:function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var a=i(n("1da1")),o=i(n("5530")),s=i(n("da08")),d=n("26cb"),c=n("fd64"),r={components:{uniIcons:s.default},mixins:[c.commonMixin],data:function(){return{bgColor:"#070219",userData:{},tradeList:[]}},onShow:function(){uni.setNavigationBarTitle({title:this.i18n.wallet.title}),this.getUserInfo(),this.loadData()},onPullDownRefresh:function(){this.loadData()},methods:(0,o.default)((0,o.default)((0,o.default)({},(0,d.mapActions)("user",["userInfo"])),(0,d.mapActions)("wallet",["getAccountLogs"])),{},{loadData:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.getAccountLogs().then((function(e){t.tradeList=e.data.data})).catch((function(t){}));case 1:case"end":return e.stop()}}),e)})))()},getUserInfo:function(){var t=this;this.userInfo().then((function(e){t.userData=e.data}))}})};e.default=r},fa81:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAuCAYAAABTTPsKAAAAAXNSR0IArs4c6QAABQxJREFUaEPNmX3onmMUxz9f5qXZVoSQGGKktv2DkpdZG4aZ5aVlSKymkZe8phg1sTJZatPyHqGY0SaT9+0PeSnKH1bDLPJOhIVx9N3OPdeePc/veXY/9892/nqe+7ruc33uc5/rXOecWwyCRMR04HJgkqSfm1xCTSqzroR9DNgBeAc4uUnoRoFbYCtbNArdGHAH2MahGwHuAtsodN/AbWA/Aw5KyvK3L/XtHn0Bt4H9CLgFeC6B3wReAu4sNndf0B2BI2InYL2kaBdJOsCOB44EXq+AJY2LiJt6hY4IMw2R9Fe7ddsC502PA78As1qhI2II8B4wJpXasuMlfRcR41qBM9y1Qp8r6ZkSKtddAOwBTGtnrE7Ac4EbUtn9HaD3Al7LORtgE6wtcAu0jbCwA+xleX2epOtarbwFcEScDiwtJj4MXNruaSPC0FSw3YBzfKykDzq42QNeqxibIumFcu5mwBGxO7AK2AACvAqcIunvdgt0WLSjhbvpiIgdgWVeM+f+ABwm6cfq3lbg+4ArcvBbYLSkb7ot1PJqawPnG7CxPgT2Tb0LJc3aAjgiDgQ+AfyUlvMlPbk1sL24RC/6IuI84Omc67drK3+6wf0qBRExH7gy/78NHNsppA20aKco0Qtoy5taARyX1xZIcva3ETgidgHsAiNywmRJ5cbreb0GgScBL+bCDq/7SFpXAU8FFufgWmBkHes25RKpx2yrgYOT6xxJz1bAjrUzc2CuJAf5WtKUhRP6DuDmBHlQ0owK+GNgVA5MkORwVksaBi4jzmpJhyr9d1368z/AcEm/16LduB/6CmstG29X4Ncicg0zsJMV5wKWNZKq1LAWc5PA6RYOtZUfjzVwaZEVkk6oRZo3DQKwMz8zWiYYeAqwJC8slTR5OwM2mxktUw18JvB8Xlgm6YztHbh0iZWSjt/OgN8ATixdotx0ayU5p6gtg+DD5aYbXYU1hzE3PlwOjZDkUFJLImLPIgf4XtLKWoo2hsihWfVUCdnQ6uBwWLOlLRMlvVJ3kSbvi4iTiqpmlaTD2x3N90i6tsmF6+qKiLuAG/P+RZJmVsAOZVUp8iVwgCSfettMsiBdY5ZNIU1aUgG7pHdl4RLJcrakKnvbJtARURrR6eXekv4oE/i7gcoV3gWOqZti9vuEaV0XEUenrvmSrvbvEnh/wGWIrW25WNKj/S5e5/5s0rgvYlkPHCLJefp/wP4TEaWVXbGOkWSf/t8kIvYD3AaoKvdN1m0H7BLJuXFVsb6VYe7P/4M4InbOXpzDmcX7alTZEG/XSJkILC+s/1RW0G17bE09SPqtO/cXFDpPlWSWTdKpVTUbuK2Y55L7IkmDYum07EOAv41UMkeSO6GbyUDNQLeNLilm2z2mS/qiKavmvrHPPlHkvL78iNfuuRmYinx+L2qB9ka83gr7DXnpAhcC8wDnH5UYdkan9tiADe1U6tdi9yjnvg/42Fy8tSdiRDjJOgtwZX5UAeo9MgeYPZAxeurAR8QEwBuiih7VOl9lS8kbw7l02ywvIoZlBucNPQ2wG5RiPY77L3dzt56A00WGA7cCVxWHS6t++/fnWel6zKDOr30otRN32d2AvF2Sj9+u0jNwpSkD+zXp2+6U15GfAEeFe7d2E281cAHuI9yv+LQsYY4o+getD+EOpA8klzv+SLO80zeMbk9fG7hVcX7EGZn+uVuO/wZ87RylLmDrOo0Bd7NMU+P/AiYER8tlZqb6AAAAAElFTkSuQmCC"},fd64:function(t,e,n){"use strict";var i=n("4ea4");n("acd8"),Object.defineProperty(e,"__esModule",{value:!0}),e.authMixin=e.commonMixin=void 0;var a=i(n("5530")),o=n("26cb"),s={computed:(0,a.default)((0,a.default)({},(0,o.mapState)("user",["loginInfo"])),{},{i18n:function(){return this.$t("message")}}),data:function(){return{contentText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},loadText:{loadmore:"轻轻上拉",loading:"努力加载中",nomore:"实在没有了"}}},filters:{fixed:function(t,e){return t?(e||(e=2),parseFloat(t).toFixed(e)):t}},onShow:function(){this.contentText={contentdown:this.i18n.common.loadmoreText,contentrefresh:this.i18n.common.loadingText,contentnomore:this.i18n.common.nomoreText},this.loadText={loadmore:this.i18n.common.loadmoreText,loading:this.i18n.common.loadingText,nomore:this.i18n.common.nomoreText}},methods:{isLogin:function(){if(this.loginInfo.hasLogin)return!0;uni.navigateTo({url:"/pages/public/login"})},navTo:function(t,e){!e||this.loginInfo.hasLogin?uni.navigateTo({url:t}):uni.navigateTo({url:"/pages/public/login"})}}};e.commonMixin=s;var d={computed:(0,a.default)({},(0,o.mapState)("user",["loginInfo"])),onShow:function(){this.loginInfo.hasLogin||uni.navigateTo({url:"/pages/public/login"})},methods:{}};e.authMixin=d}}]);