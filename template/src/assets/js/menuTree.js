//菜单组成相关函数


//获取通过数据组成权限树权限树的父子结构,需要有父子结构的key
export function menuAuthTree(privilegesList,parentVal,parentkey,childKey) {
	let menuList = privilegesList.filter(item => {
            return item[parentkey].toUpperCase() == parentVal.toUpperCase();
    })
	if (menuList.length > 0) {
		for (const menu of menuList) {
			if (typeof menu[childKey]!= "undefined") {
				menu['childs'] = menuAuthTree(privilegesList,menu[childKey],parentkey,childKey)
			}
		}
	}
	return menuList;
}

/*
*这种方式使用会使菜单出现任意性
*处理菜单树，需要传入权限数据跟本地资源菜单数据，需要处理的对应关联的key code
*处理本地资源菜单数据，本地资源菜单需要有对应的父子结构的key  code   parentCode
* 
*/
export function formatMenu(permsData,menuData,id,parentId) {
    let menuList = []
    for (const perms of permsData) {
        let permsFilter = menuData.filter(item => {
            return item[id] == perms[parentId]
        })
        if (permsFilter.length > 0) {
            menuList = menuList.concat(permsFilter);
            let filterLsit = formatMenu(permsFilter,menuData,'code','parentCode');
            menuList = menuList.concat(filterLsit);
        }

    }
    //过滤数组中重复的数据
    menuList = new Set(menuList);
    return [...menuList]
}
/*
*保证菜单位置不变动，只能在本地菜单上加标识，进行过滤
*处理菜单树，需要传入权限数据跟本地资源菜单数据，需要处理的对应关联的key code
*处理本地资源菜单数据，本地资源菜单需要有对应的父子结构的key  code   parentCode
*/
export function formatLocMenu(permsData,menuData,id,parentId){
    for (const menu of menuData) {
        let menuFilter = permsData.filter(item =>{
            return item[parentId] == menu[id]
        })
        if(menuFilter.length > 0){
            menu['isShow'] = true;
            menuFilter.map(value=>{
                value['parentCode'] = menu['parentCode']
            });
            formatLocMenu(menuFilter,menuData,'code','parentCode'); 
        }
    }
}

//返回生成好的菜单树
export function getMenuTree(permsData,menuData,parentVal) {
    formatLocMenu(permsData,menuData,'code','code');
    let menuList = []
    for (const menu of menuData) {
        if(menu['isShow']){
            menuList.push(menu)
        }
    }
    return menuAuthTree(menuList,parentVal,'parentCode','code')
}