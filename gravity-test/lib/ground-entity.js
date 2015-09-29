'use strict';

var defaults = {
    width: 230,
    height: 50,
    posX: 35,
    posY: 50,

    currentHColorDirection: -0.004,
    currentHColor: 0,
    colorChangeInterval: 100
};

var GroundEntity = function(settings) {
    Object.assign(this, defaults, settings);
};

Object.assign(GroundEntity.prototype, {
    onInit: function() {
        this.physics = this.getComponent('physics');
        this.animationLoop = this.getComponent('animation-loop');
        this.shapes = [];

        this.createBody();

        this.colorChangeTimer = this.animationLoop.getTimer(this.colorChangeInterval);
    },

    createBody: function() {
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        var bd = new this.physics.Box2D.b2BodyDef();
        bd.set_type(this.physics.Box2D.b2_staticBody);
        bd.set_position(new this.physics.Box2D.b2Vec2((this.posX + this.halfWidth) * this.physics.b2scale, (this.posY + this.halfHeight) * this.physics.b2scale));
        this.body = this.physics.world.CreateBody(bd);

        this.addBoxShape(-65, this.height / 2 - 5, 70, 10);
        this.addBoxShape(65, this.height / 2 - 5, 70, 10);
        this.addBoxShape(0, -(this.height / 2) + 3, 55, 5);
        this.addCircleShape(-100, this.height / 2 - 5, 14);
        this.addCircleShape(100, this.height / 2 - 5, 14);
    },

    addBoxShape: function(x, y, w, h) {
        var shape = new this.physics.Box2D.b2PolygonShape();
        shape.SetAsBox(w / 2 * this.physics.b2scale, h / 2 * this.physics.b2scale, new this.physics.Box2D.b2Vec2(x * this.physics.b2scale, y * this.physics.b2scale), 0);

        var fd = new this.physics.Box2D.b2FixtureDef();
        fd.set_shape(shape);
        this.body.CreateFixture(fd);

        this.shapes.push({
            type: shape.GetType(),
            x: x + this.halfWidth - w / 2,
            y: y + this.halfHeight - h / 2,
            w: w,
            h: h
        });
    },

    addCircleShape: function(x, y, radius) {
        var shape = new this.physics.Box2D.b2CircleShape();
        shape.set_m_p(new this.physics.Box2D.b2Vec2(x * this.physics.b2scale, y * this.physics.b2scale));
        shape.set_m_radius(radius * this.physics.b2scale);

        var fd = new this.physics.Box2D.b2FixtureDef();
        fd.set_shape(shape);
        this.body.CreateFixture(fd);

        this.shapes.push({
            type: shape.GetType(),
            x: x + this.halfWidth,
            y: y + this.halfHeight,
            radius: radius
        });
    },

    onUpdate: function() {
        if (this.colorChangeTimer.done(true)) {
            if (this.currentHColor >= 1 || this.currentHColor <= 0) this.currentHColorDirection *= -1;
            this.currentHColor += this.currentHColorDirection;
        }
    },

    onDraw: function(graphics) {
        var fillColor = hslToHex(this.currentHColor, 0.61, 0.56);

        for (var i = 0; i < this.shapes.length; i++) {
            graphics.beginFill(fillColor, 0.5);
            var shape = this.shapes[i];
            if (shape.type == 0) this.drawCircle(graphics, shape);
            else if (shape.type == 2) this.drawPolygon(graphics, shape);
        }
    },

    drawCircle: function(graphics, shape) {
        graphics.drawCircle(this.posX + shape.x, this.posY + shape.y, shape.radius);
    },

    drawPolygon: function(graphics, shape) {
        graphics.drawRect(this.posX + shape.x, this.posY + shape.y, shape.w, shape.h);
    }
});

function hslToHex(h, s, l) {
    var rgb = hslToRgb(h, s, l);
    return '0x' + decimalToHex(rgb[0]) + decimalToHex(rgb[1]) + decimalToHex(rgb[2]);
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Copied from: http://stackoverflow.com/a/57807
 */
function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

module.exports = GroundEntity;
