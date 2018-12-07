var randomText = function(PIXI,W,H)
{
    var Sprite = PIXI.Sprite ;
    var Text = PIXI.Text ;
    var me = this.me = new Sprite();
    this.init = function(textField='')
    {
        me.removeChildren();
        var x = 0 ; 
        for(var i = 0 ; i<textField.length ; i++)
        {
            var style = new PIXI.TextStyle({
                fontSize: 16,
                fill: "white",
            });
            var textField = new Text(textField.charAt(i),style);
            me.addChild(textField);
            alert("textField.charAt(i) : "+textField.charAt(i));
            x+=textField.width ;
        }
    }
    return this ;
}