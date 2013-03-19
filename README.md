广告杀手（ad-killer）
==================

一个清除粗暴乱入广告的浏览器标签。

A bookmarklet for web browser to kill rude advertisement.

##使用方法

由于在 README.md 文件中无法设置 href 属性为一段可执行的 javascript 代码（会被 github 自动过滤掉），所以在此贴上广告杀手书签小程序的代码：

javascript:(function(){if(window.adKillerByKikoshoung)return window.adKillerByKikoshoung.excu(),void 0;var i=document.createElement("script"),e=document.createElement("div"),o=document.body,d=1,n=d?"https://raw.github.com/kikoshoung/ad-killer/master":"http://localhost";i.src=n+"/minified/ad-killer.min.js",e.id="ad-killer-panel",e.style.cssText="position: fixed; z-index: 9999999999; top: 0; right: 0; padding: 5px 10px; background-color: gold; color: black; font-size: 12px;",e.innerHTML="\u6b63\u5728\u4e3a\u60a8\u52a0\u8f7d\u5e7f\u544a\u6740\u624b...",o.appendChild(i),o.appendChild(e)})();

将以上代码作为网页的 URL 手动添加为浏览器书签后，在目标网页（含广告的网页，如：<a target="_blank" href="http://www.yyets.com">人人影视</a>、<a target="_blank" href="http://www.dytt8.net">电影天堂</a>等）被打开后，点击刚刚手动添加的书签感受一下吧~（具体添加书签的方法可以 google 一下，Chrome 用户可以看下<a target="_blank" href="http://support.google.com/chrome/bin/answer.py?hl=zh-Hans&answer=95739">这里</a>）

您也可以去<a target="_blank" href="http://kikoshoung.me/#ad-killer">我的主页</a>进行快速的拖动式添加书签。



##产生背景

大家有木有在浏览一些网站的时候，经常遇到一些粗暴乱入的广告？他们不是不痛不痒地挡住了你的操作区域就是极其无耻的给你埋下了地雷。其实哥也忍他们好久了，所以一气之下做了个小程序，专治这种粗暴乱入的小广告。

PS：优雅的广告和一些不影响使用的广告我并没有处理。一是实现起来很困难，因为广告形式太多；二是因为做人不能太绝，人家免费给你用功能，赚点儿广告费也是应该的。

##案例展示

###案例1

这是大名鼎鼎的“人人影视”，页面中左右两边的广告以及右下角的广告，挡住了页面的不少面积。

<img src="https://raw.github.com/kikoshoung/ad-killer/master/img/ad-killer-sample.jpg">

对于某些爱干净的人来说，这简直尼玛阿西吧！

###案例2

这是小有名气的“电影天堂”，页面中除了右下角乱入的广告之外，还有一个宇宙超级不要脸的隐形全屏广告！

<img src="https://raw.github.com/kikoshoung/ad-killer/master/img/ad-killer-sample2.jpg">

大家注意鼠标的状态，并没有像平常遇到链接时的状态那样（变成手形鼠标、多了下划线、文字颜色有所改变）。那这是为什么呢？其实是因为该网站嵌了一种宇宙超级不要脸的隐形全屏广告！不管怎么样，你都必须点击一次页面触发了广告后才能正常使用你需要的功能。

对于某些平生最讨厌被欺骗或是生怕链接有病毒的人来说，这也简直尼玛阿西吧！

##关于“广告杀手”

广告杀手的原理其实就是遍历了一下 DOM 结构，然后套用一下黑名单，看当前 DOM 是否有嫌疑。有的话就列入到杀除队列，待到遍历完成之后，将杀除队列的 DOM 全部删除以达到清除广告的效果。

可能大家也发现了，最重要的是黑名单，所以在这里我鼓励大家多多使用“广告杀手”书签，如果当你发现了无法清除的粗暴广告，请及时反馈给我，反馈的功能我随后会加入到书签内，谢谢大家的支持~
