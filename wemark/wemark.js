"use strict";

var parser = require("./parser.js");
var getRichTextNodes = require("./richtext.js").getRichTextNodes;

Component({
  properties: {
    md: {
      type: String,
      value: '',
      observer: function observer() {
        this.parseMd();
      }
    },
    type: {
      type: String,
      value: 'wemark'
    },
    link: {
      type: Boolean,
      value: false
    },
    highlight: {
      type: Boolean,
      value: false
    }
  },
  data: {
    parsedData: {},
    richTextNodes: []
  },
  methods: {
    parseMd: function parseMd() {
      if (this.data.md) {
        var parsedData = parser.parse(this.data.md, {
          link: this.data.link,
          highlight: this.data.highlight
        });
        // console.log('parsedData:', parsedData);
        if (this.data.type === 'wemark') {
          this.setData({
            parsedData: parsedData
          });
        } else {
          // var inTable = false;
          var richTextNodes = getRichTextNodes(parsedData);

          // console.log('richTextNodes:', richTextNodes);

          this.setData({
            richTextNodes: richTextNodes
          });

          /* // 分批更新
          var update = {};
          var batchLength = 1000;
          console.log(batchLength);
          for(var i=0; i<richTextNodes.length; i++){
          	update['richTextNodes.' + i] = richTextNodes[i];
          	if(i%batchLength === batchLength - 1){
          		console.log(update);
          		this.setData(update);
          		update = {};
          	}
          }
          this.setData(update);
          update = {}; */
        }
      }
    }
  }
});