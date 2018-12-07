var randomText = function(PIXI,onSizeUpdated=()=>{})
{
    var Sprite = PIXI.Sprite ;
    var Text = PIXI.Text ;
    var me = this.me = new Sprite();
    var x = 0 ;

    var lastText = '' ;
    var lastSizeList = [] ;
    var emojiesReady = false ;

    const emojiList = [
        "./RandomText/img/smile.png",
        "./RandomText/img/dollar.png"
    ] ;
    const emojiChars = [
        '☺',
        '$'
    ]

    PIXI.loader
    .add(
        emojiList
    )
    .load(emojiesLoaded);

    function emojiesLoaded()
    {
        emojiesReady = true ;
        init(lastText,lastSizeList);
    }

    /**Pass your text and size list here to make you the text field */
    init = this.init = function(text='',sizeList=[])
    {
        lastText = text ;
        lastSizeList = sizeList ;

        me.removeChildren();
        x = 0 ; 
        var lastSize = 16 ;
        var lastHeight = 30 ;
        for(var i = 0 ; i<text.length ; i++)
        {
            var currentText = text.charAt(i) ;
            if(lastSizeList.length>i)
            {
                lastSize = lastSizeList[i] ;
            }
            if(emojiesReady)
            {
                var foundedEmojiIndex = emojiChars.indexOf(currentText);
                if(foundedEmojiIndex!==-1)
                {
                    var emoj = new Sprite(PIXI.loader.resources[emojiList[foundedEmojiIndex]].texture);
                    me.addChild(emoj);
                    emoj.x = x ;
                    emoj.width = emoj.height = lastHeight;
                    x+=emoj.width ;
                    continue;
                }
            }
            var style = new PIXI.TextStyle({
                fontSize: lastSize,
                fill: "white",
            });

            var textField = new Text(currentText,style);
            me.addChild(textField);
            textField.x = x ;
            //Calculate text size here
            var textMetrics = PIXI.TextMetrics.measureText(currentText, style);
            lastHeight = textMetrics.height ;
            x+= textMetrics.width ;
        }

        onSizeUpdated();
    }


    this.getWidth = function()
    {
        return x ;
    }
    return this ;
}