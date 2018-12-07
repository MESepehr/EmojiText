var randomText = function(PIXI,onSizeUpdated=()=>{})
{
    var Sprite = PIXI.Sprite ;
    var Text = PIXI.Text ;
    var me = this.me = new Sprite();
    var x = 0 ;

    var lastText = '' ;
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
        init(lastText);
    }

    init = this.init = function(text='')
    {
        lastText = text ;

        me.removeChildren();
        x = 0 ; 
        for(var i = 0 ; i<text.length ; i++)
        {
            var currentText = text.charAt(i) ;
            if(emojiesReady)
            {
                var foundedEmojiIndex = emojiChars.indexOf(currentText);
                if(foundedEmojiIndex!==-1)
                {
                    var emoj = new Sprite(PIXI.loader.resources[emojiList[foundedEmojiIndex]].texture);
                    me.addChild(emoj);
                    emoj.x = x ;
                    x+=emoj.width ;
                    continue;
                }
            }
            var style = new PIXI.TextStyle({
                fontSize: 16,
                fill: "white",
            });

            var textField = new Text(currentText,style);
            me.addChild(textField);
            textField.x = x ;
            //Calculate text size here
            var textMetrics = PIXI.TextMetrics.measureText(currentText, style);
            x+=textMetrics.width ;
        }

        onSizeUpdated();
    }


    this.getWidth = function()
    {
        return x ;
    }
    return this ;
}