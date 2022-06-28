//下拉用value  其他用key

//------------------------------平台客户类型------------------------------
const platformCustomerTypeList = [
    {label: '供应商', key: 'B'},
    {label: '核心企业', key: 'S'},
    {label: '保理公司', key: 'BL'},
    {label: '金融机构', key: 'F'},
    {label: '平台运营', key: 'O'}
]
export let platformCustomerType = platformCustomerTypeList
export let platformCustomerTypeSelect = [
    {label: '供应商', value: 'B'},
    {label: '核心企业', value: 'S'},
    {label: '保理公司', value: 'BL'},
    {label: '金融机构', value: 'F'},
    {label: '平台运营', value: 'O'}
]
export const platformCustomerTypeFilters = (value) => {
    if(!value){ return  }
    let citem =  platformCustomerTypeList.find(item => {
        return item.key === value
    })
    return citem.label
}
//------------------------------供应商类型------------------------------
const supplierTypeList = [
    {label: '直接供应商', key: '01'},
    {label: '间接供应商', key: '02'},
]
export const supplierType = supplierTypeList
export const supplierTypeFilters = (value) => {
    if(!value){ return  }
    let citem =  supplierTypeList.find(item => {
        return item.key === value
    })
    return citem.label
}
//------------------------------企业状态------------------------------
const enterprisesStateList = [
    {label: '待填写资料', key: '0'},
    {label: '注册成功', key: '1'},
    {label: '注册失败', key: '2'},
    {label: '待平台审核', key: '3'},
    {label: '待资料确认', key: '4'},
    {label: '待发证', key: '5'},
    {label: '注册驳回', key: '6'},
    {label: '注册拒绝', key: '7'},
    {label: '已注销', key: '8'},
]
export const enterprisesState = enterprisesStateList
export const enterprisesStateFilters = (value) => {
    if(!value){ return  }
    let citem =  enterprisesStateList.find(item => {
        return item.key === value
    })
    return citem.label
}
//------------------------------公司规模------------------------------
const enterprisesSizeList = [
    {label: '大型企业', key: '1'},
    {label: '中型企业', key: '2'},
    {label: '小型企业', key: '3'},
    {label: '微型企业', key: '4'}
]
export const enterprisesSize = enterprisesSizeList
export const enterprisesSizeFilters = (value) => {
    if(!value){ return  }
    let citem =  enterprisesSizeList.find(item => {
        return item.key === value
    })
    return citem.label
}
//------------------------------企业类型------------------------------
const enterprisesTypeList = [
    {label: '大型客户', value: '01010000'},
    {label: '中型客户', value: '01020000'},
    {label: '小型客户', value: '01030000'},
    {label: '机关或事业单位', value: '02030000'},
    {label: '个体工商户', value: '05000000'}
]
export const enterprisesType = enterprisesTypeList
export const enterprisesTypeFilters = (value) => {
    if(!value){ return  }
    let citem =  certTypeList.find(item => {
        return item.value === value
    })
    return citem.label
}
//------------------------------身份证类型----------------------------
const certTypeList = [
    {label: '身份证', value: '01'},
    {label: '护照', value: '02'},
    {label: '港澳居民来往内地通行证（香港）', value: '04'},
    {label: '台湾同胞来往内地通行证', value: '05'},
    {label: '港澳居民来往内地通行证（澳门）', value: '06'},
    {label: '其他', value: '99'},
]
export const certType = certTypeList
export const certTypeFilters = (value) => {
    if(!value){ return  }
    let citem =  certTypeList.find(item => {
        return item.value === value
    })
    return citem.label
}
//------------------------------附件类型----------------------------
const butTypeList = [
    //企业类型
    {label: '营业执照', value: 'QYYZ'},
    {label: '法人证件照', value: 'QYFRZJ'},
    //用户类型
    {label: '证件照', value: 'YHZJ'},
    //贸易关系
    {label: '贸易关系证明材料', value: 'MYGX'},
    //交易附件
    {label: '其他附件', value: 'JYQT'},
    {label: '审核附件', value: 'JYSH'},
    {label: '中登网登记', value: 'JYZD'},
]
export const butTypeSelect = butTypeList
export const butTypeFilters = (value) => {
    if(!value){ return  }
    let citem =  certTypeList.find(item => {
        return item.value === value
    })
    return citem.label
}
//企业管理--修改企业---相关附件资料


//省市区处理规则
export const PCCA = (type = 'select') => {
    let pccaList = []
    let pccaData = [
        { districtName: '河北省',treeCode:'003' },
        { districtName: '山西省',treeCode:'004'},
        { districtName: '石家庄市',treeCode:'003001' },
        { districtName: '唐山市',treeCode:'003002' },
        { districtName: '太原市',treeCode:'004001' },
        { districtName: '太同市',treeCode:'004002' },
        { districtName: '西藏自治区',treeCode:'026' },
        { districtName: '拉萨市',treeCode:'026001' },
        { districtName: '昌都地区',treeCode:'026002' },
        { districtName: '城关区',treeCode:'026001001' },
        { districtName: '林周县',treeCode:'026001002' },
        { districtName: '昌都县',treeCode:'026002001' },
        { districtName: '江达县',treeCode:'026002002' },
    ]
    //1.先拿到省
    pccaData.forEach(item=>{
        if(item.treeCode.length <= 3){
            pccaList.push(item)
        }
    })
    //2.查找  省 对应的  市
    pccaList.forEach(item => {
        item.children = pccaData.filter(citem => {
               if(
                   citem.treeCode.length > 3
                    && citem.treeCode.length <= 6
                    && citem.treeCode.indexOf( item.treeCode ) >= 0
               ){
                   return citem
               }
        })
    })
    //3. 查找 市 对应的 县
    pccaList.forEach(item => {
        item.children.forEach(citem => {
            citem.children = pccaData.filter(ccitem => {
                if(
                    ccitem.treeCode.length > 6
                    && ccitem.treeCode.length <= 9
                    && ccitem.treeCode.indexOf( citem.treeCode ) >= 0
                ){
                    return ccitem
                }
            })
        })
    })
    //4. 清空children长度为0的每一项
    pccaList.forEach( (item) => {
        //存在市
        if(item.children){
              // 不存在市
              if(item.children.length <= 0){
                  delete item.children
              }
              //存在市
              else {
                  item.children.forEach(citem => {
                      //删除 不存在的县 的children
                      if(citem.children && citem.children.length <=0){
                          delete citem.children
                      }
                  })
              }
        }
    } )

    //start: 默认替换成 select类型
    if( type === 'select' ){
        pccaList = JSON.parse(
                        JSON.stringify(pccaList)
                        .replace(/districtName/g,'label')
                        .replace(/treeCode/g,'value')
                   )
    }

    //end. 最后返回 省市区 列表
    return pccaList
}