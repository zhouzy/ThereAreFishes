exports.index = function(req, res){
    var itemlist = [
        {
            userInfo:{
                avertarUrl:"/images/header.jpg",
                userName:"垂钓爱好者1"
            },
            fishing:{
                photoUrl:"/images/flower.png",
                abstract:"钓了3条两斤多的鲤鱼，安逸的很,纯天然",
                fishTools:{
                    fishhook:"伊势尼鱼钩",
                    fishingRod:"酒鬼溪钓硬调4.5",
                    bait:"渔痴孟公鲤.秘方包"
                }
            }
        },{
            userInfo:{
                avertarUrl:"/images/header.jpg",
                userName:"垂钓爱好者2"
            },
            fishing:{
                photoUrl:"/images/flower.png",
                abstract:"钓了3条两斤多的鲤鱼，安逸的很,纯天然",
                fishTools:{
                    fishhook:"伊势尼鱼钩",
                    fishingRod:"酒鬼溪钓硬调4.5",
                    bait:"渔痴孟公鲤.秘方包"
                }
            }
        },{
            userInfo:{
                avertarUrl:"/images/header.jpg",
                userName:"垂钓爱好者3"
            },
            fishing:{
                photoUrl:"/images/flower.png",
                abstract:"钓了3条两斤多的鲤鱼，安逸的很,纯天然",
                fishTools:{
                    fishhook:"伊势尼鱼钩",
                    fishingRod:"酒鬼溪钓硬调4.5",
                    bait:"渔痴孟公鲤.秘方包"
                }
            }
        },{
            userInfo:{
                avertarUrl:"/images/header.jpg",
                userName:"垂钓爱好者4"
            },
            fishing:{
                photoUrl:"/images/flower.png",
                abstract:"钓了3条两斤多的鲤鱼，安逸的很,纯天然",
                fishTools:{
                    fishhook:"伊势尼鱼钩",
                    fishingRod:"酒鬼溪钓硬调4.5",
                    bait:"渔痴孟公鲤.秘方包"
                }
            }
        },{
            userInfo:{
                avertarUrl:"/images/header.jpg",
                userName:"垂钓爱好者5"
            },
            fishing:{
                photoUrl:"/images/flower.png",
                abstract:"钓了3条两斤多的鲤鱼，安逸的很,纯天然",
                fishTools:{
                    fishhook:"伊势尼鱼钩",
                    fishingRod:"酒鬼溪钓硬调4.5",
                    bait:"渔痴孟公鲤.秘方包"
                }
            }
        },{
            userInfo:{
                avertarUrl:"/images/header.jpg",
                userName:"垂钓爱好者6"
            },
            fishing:{
                photoUrl:"/images/flower.png",
                abstract:"钓了3条两斤多的鲤鱼，安逸的很,纯天然",
                fishTools:{
                    fishhook:"伊势尼鱼钩",
                    fishingRod:"酒鬼溪钓硬调4.5",
                    bait:"渔痴孟公鲤.秘方包"
                }
            }
        },{
            userInfo:{
                avertarUrl:"/images/header.jpg",
                userName:"垂钓爱好者7"
            },
            fishing:{
                photoUrl:"/images/flower.png",
                abstract:"钓了3条两斤多的鲤鱼，安逸的很,纯天然",
                fishTools:{
                    fishhook:"伊势尼鱼钩",
                    fishingRod:"酒鬼溪钓硬调4.5",
                    bait:"渔痴孟公鲤.秘方包"
                }
            }
        },{
            userInfo:{
                avertarUrl:"/images/header.jpg",
                userName:"垂钓爱好者8"
            },
            fishing:{
                photoUrl:"/images/flower.png",
                abstract:"钓了3条两斤多的鲤鱼，安逸的很,纯天然",
                fishTools:{
                    fishhook:"伊势尼鱼钩",
                    fishingRod:"酒鬼溪钓硬调4.5",
                    bait:"渔痴孟公鲤.秘方包"
                }
            }
        }
    ];
    var model = {
        title:"这儿有鱼",
        itemList:itemlist
    };
    res.render('index',model);
};