"use strict";

const PostHTML = require("posthtml");
import BS_CLASSES from './bsClasses';


var html =`
<div class="js-row">
  <div class="js-col-lg-6">
    <div class="js-input-group">
      <span class="js-input-group-btn">
        <button class="btn js-btn-default" type="button">Go!</button>
      </span>
      <input type="text" class="js-form-control" placeholder="Search for...">
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
  <div class="col-lg-6">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Search for...">
      <span class="js-input-group-btn">
        <button class="btn btn-default" type="button">Go!</button>
      </span>
    </div><!-- /input-group -->
  </div><!-- /.col-lg-6 -->
</div><!-- /.row -->
    `;

function inNode(arr, val) {
    return arr.some(function(arrVal) {
        return val === arrVal;
    })
}

var plugReplacePref = function plugin(tree) {
    return tree.match({attrs: {class: true}}, function(node) {
        let currentClasses = node.attrs.class.split(' ');
        let jsClasses = currentClasses
            .filter(function(className) {return className.substring(0,3) === 'js-';})
            .map(function(tag) { return tag.substr(3);});

        var bsClasses = currentClasses.filter(function (className) {
            if (!inNode(BS_CLASSES, className) && !(className.substring(0, 3) === 'js-')) {
                return className;
            }
        });
        delete node.attrs.class;
        if (jsClasses.length > 0) node.attrs['data-js'] = jsClasses.join(' ');
        if (bsClasses.length > 0) node.attrs['class'] = bsClasses.join(' ');
        return node;
    })
};

PostHTML([plugReplacePref])
    .process(html)
    .then(function(result) {
        console.log(result.html)
    })
    .catch(console.error);