const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject || [
    {logo: 'A', url: 'https://www.acfun.cn'},
    {logo: 'B', url: 'https://www.bilibili.com'}
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    // /后有任何内容都删掉
    .replace(/\/.*/, '')
}

// 渲染函数 先清除 再根据hashMap的数据渲染
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${simplifyUrl(node.url)[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })

        $li.on('click', '.close', (e) => {
            // 阻止冒泡
            e.stopPropagation()
            console.log(hashMap);
            hashMap.splice(index, 1)
            // 删除后需要重新渲染
            render()
            console.log(hashMap);
        })
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('输入添加的网址->')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        
        // console.log(url);

        hashMap.push({logo: url[8], url : url})
        render()
    })

// 即将离开当前页面(刷新或关闭)时执行
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    // console.log(e);
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            console.log(hashMap[i].logo.toLowerCase());
            window.open(hashMap[i].url)
        }
    }
})