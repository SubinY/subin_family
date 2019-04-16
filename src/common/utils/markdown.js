/* eslint-disable import/prefer-default-export */
/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2019-01-21 11:30:29
 * @description: html标签转markdown解析
 */


/* 取得a标签文本，并转为markdown格式链接 */
function anchorText(str) {
  var reg = /<a[^>]+?href=["']?([^"']+)["']?[^>]*>([^<]+)<\/a>/g;
  str = str.replace(reg, '[$2]($1)');
  return str;
}

function strongText(str) {
  var reg = /<strong[^>]+?style=["']?([^"']+)["']?[^>]*>([^<]+)<\/strong>/g;
  str = str.replace(reg, '**($2)**');
  return str;
}

function imgText(str) {
  var reg = /<img[^>]+?src=["']?([^"']+)["']?[^>]*>/g;
  str = str.replace(reg, `![](https://family.1ziton.com/$1)`);
  return str;
}


export const htmlReplaceText = (text) => {
  text = text.replace(/<ol>/g, '\n');
  text = text.replace(/<\/ol>/g, '\n');
  text = text.replace(/<li>/g, '');
  text = text.replace(/<\/li>/g, '');
  text = text.replace(/<br>/g, '\n');
  text = text.replace(/<br \/ >/g, '\n');
  text = text.replace(/<p>/g, '');
  text = text.replace(/<\/p>/g, '\n');
  // text = text.replace(/<strong>/g, '**');
  // text = text.replace(/<strong .*>/g, '**');
  // text = text.replace(/<\/strong>/g, '**');
  text = text.replace(/<h3>/g, '\n ### <h3>');
  text = text.replace(/<h2/g, '\n ## <h2');
  text = text.replace(/<h1/g, '\n # <h1');
  // console.log(text)
  text = anchorText(text);
  text = strongText(text);
  // html图片转为markdown格式
  text = imgText(text);

  return text;
}
