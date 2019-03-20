<template>
    <div class="vconst-preview">
        <div class="vconst-images-holder">
            <!--<img class="vconst-layer" v-for="layerData in layersData" :src="layerData.img" v-bind:style="{'z-index':100+layerData.layer}"/>-->
            <canvas ref="canvas"></canvas>
            <canvas @mousemove="zoom_preview" @mouseleave="stopZoom" id="orig-canvas" ref="origCanvas"></canvas>
        </div>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                layersData: [],
                canvas: null,
                origCanvas:null,
                ctx:null,
                origctx: null,
                canvasHeight: 123,
                canvasWidth: 123,
                zoom: 2
            }
        },
        mounted: function(){
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext("2d");
            this.origCanvas = this.$refs.origCanvas;
            this.origctx = this.origCanvas.getContext("2d")
        },
        created() {
        },
        methods: {
            zoom_preview: function(event) {
                this.ctx.setTransform(1, 0, 0, 1, 0, 0)
                var mousePos = this.getMousePos(event);
                this.ctx.translate(0,mousePos.y);
                this.ctx.scale(this.zoom,this.zoom);
                this.ctx.translate(-mousePos.x,-mousePos.y);
                this.ctx.drawImage(this.origCanvas, 0, 0 , this.origCanvas.width, this.origCanvas.height);
            },
            stopZoom: function() {
                this.ctx.setTransform(1, 0, 0, 1, 0, 0)
                this.ctx.drawImage(this.origCanvas, 0, 0, this.canvas.width, this.canvas.height);
            },
            getMousePos (evt) {
                // https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
                var rect = this.ctx.canvas.getBoundingClientRect();
                return {
                    x: parseInt((evt.clientX - rect.left) / (rect.right - rect.left) * this.canvasWidth),
                    y: parseInt((evt.clientY - rect.top) / (rect.bottom - rect.top) * this.canvasHeight)
                }
            },
            get_item_image:function(item, group) {
                var vm = this;
                this.$http.get(this.$root.api_url,  {params: {action: 'get_item', item: item}})
                    .then(function (response) {
//                        console.log(response);
                        vm.drawImage(response.data);
                        vm.layersData.push({'img':response.data, 'layer': vm.$root.layers[group]});
                    })
                    .catch(function (error) {
                        // Wu oh! Something went wrong
                        console.log(error.message);
                    });
            },
            drawImage: function(imgSrc) {
                var img = new Image;
                img.src = imgSrc;
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
                this.origctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }
        },
        watch: {
            "$root.product": {
                handler:function() {
                    this.layersData = [];
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.origctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    for(var group in this.$root.layers) {
                        if(this.$root.rules[this.$root.layers[group]['key']]['max'] <= 1) {
                            this.get_item_image(this.$root.product[this.$root.layers[group]['key']], this.$root.layers[group]['key'])
                        } else {
                            for(var innerKey in this.$root.product[this.$root.layers[group]['key']]) {
                                this.get_item_image(this.$root.product[this.$root.layers[group]['key']][innerKey], this.$root.layers[group]['key'])
                            }
                        }
                    }
                },
                deep:true,
            }
        },
    }
</script>