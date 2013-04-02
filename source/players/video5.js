/*
 * The Flowplayer player for Shadowbox.
 * @author      MGA
 * @version     0.1
 */
/*jslint devel: true, browser: true, sub: true, debug: false, white: true, maxerr: 999, indent: 4 */
/*global jQuery, escape, unescape, S */
/**
 * The height (in pixels) of the QuickTime controller.
 *
 * @type    {Number}
 * @private
 */
var hSpace = 32, vSpace= 139+35;

/**
 * Constructor. The QuickTime player class for Shadowbox.
 *
 * @param   {Object}    obj     The content object
 * @param   {String}    id      The player id
 * @public
 */
S.video5 = function(obj, id) {
    this.obj = obj;
    this.id = id;

    // height/width default to 300 pixels
    this.height = (obj.height ? parseInt(obj.height, 10) : 300)+vSpace;
    this.width = (obj.width ? parseInt(obj.width, 10) : 300)+hSpace;
};

S.video5.ext = ["mp4", "ogv", "webm"];

S.video5.prototype = {

    /**
     * Appends this movie to the document.
     *
     * @param   {HTMLElement}   body    The body element
     * @param   {Object}        dims    The current Shadowbox dimensions
     * @public
     */
    append: function(body, dims) {
        var opt = S.options,
            autoplay = String(opt.autoplayMovies),
            controls = String(opt.showMovieControls);

        var mov=this.obj.link.href.toString().replace(/\.(mp4|ogv)/gi,"");
        var html='\
            <div class="cm-mod cm-mod-regular cm-mod-compact">\
                <div class="head">\
                    <hgroup>\
                        <h2 class="cm-typo-heading-2">'+((this.obj.title)?this.obj.title:"Video")+'</h2>\
                    </hgroup>\
                </div><!-- .head -->\
                <div class="body">\
                    <div class="cm-lib-video -is-paused is-mouseover fixed-controls -no-toggle -aside-time -no-time -no-mute -no-volume play-button no-embed" data-ratio="'+(this.obj.height/this.obj.width)+'">\
                        <video>\
                            <source type="video/webm" src="'+mov+'.webm">\
                            <source type="video/ogv" src="'+mov+'.ogv">\
                            <source type="video/mp4" src="'+mov+'.mp4">\
                        </video>\
                    </div>\
                </div><!-- .body -->\
                <div class="foot">\
                    <footer>\
                        <a href="#" class="cm-button" onclick="Shadowbox.close();"><span>Close</span></a>\
                    </footer>\
                </div><!-- .foot -->\
            </div><!-- .cm-mod-form -->';
        body.innerHTML = html;
    },
    /**
     * Removes this movie from the DOM.
     *
     * @public
     */
    remove: function() {
        try {
            document[this.id].Stop(); // stop QT video stream
        } catch(e) {}

        var el = get(this.id);
        if (el) {remove(el);}
    },

    /**
     * An optional callback function to process after this content has been loaded.
     *
     * @public
     */
    onLoad: function() {
        $(".cm-lib-video").flowplayer({
            swf:"_swf/flowplayer.swf",
            key:"#$68dc153883608cabb8e"
        }).bind("load ready resume pause finish",function(e,api){/*track(e.type,api)*/});
    }

}
