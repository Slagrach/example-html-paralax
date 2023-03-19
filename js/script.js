var toggle = document.getElementById("toggle");
var center = document.querySelector(".center");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    center.classList.toggle("active");
});

var c = document.getElementById("c"),
    ctx = c.getContext("2d"),
    cw = (c.width = 300),
    ch = (c.height = 300),
    parts = [],
    partCount = 200,
    partsFull = false,
    hueRange = 50,
    globalTick = 0,
    rand = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

var Part = function () {
    this.reset();
};

Part.prototype.reset = function () {
    this.startRadius = rand(1, 25);
    this.radius = this.startRadius;
    this.x = cw / 2 + (rand(0, 6) - 3);
    this.y = 250;
    this.vx = 0;
    this.vy = 0;
    this.hue = rand(globalTick - hueRange, globalTick + hueRange);
    this.saturation = rand(50, 100);
    this.lightness = rand(20, 70);
    this.startAlpha = rand(1, 10) / 100;
    this.alpha = this.startAlpha;
    this.decayRate = 0.1;
    this.startLife = 7;
    this.life = this.startLife;
    this.lineWidth = rand(1, 3);
};

Part.prototype.update = function () {
    this.vx += (rand(0, 200) - 100) / 1500;
    this.vy -= this.life / 50;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha = this.startAlpha * (this.life / this.startLife);
    this.radius = this.startRadius * (this.life / this.startLife);
    this.life -= this.decayRate;
    if (
        this.x > cw + this.radius ||
        this.x < -this.radius ||
        this.y > ch + this.radius ||
        this.y < -this.radius ||
        this.life <= this.decayRate
    ) {
        this.reset();
    }
};

Part.prototype.render = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = ctx.strokeStyle =
        "hsla(" +
        this.hue +
        ", " +
        this.saturation +
        "%, " +
        this.lightness +
        "%, " +
        this.alpha +
        ")";
    ctx.lineWidth = this.lineWidth;
    ctx.fill();
    ctx.stroke();
};

var createParts = function () {
    if (!partsFull) {
        if (parts.length > partCount) {
            partsFull = true;
        } else {
            parts.push(new Part());
        }
    }
};

var updateParts = function () {
    var i = parts.length;
    while (i--) {
        parts[i].update();
    }
};

var renderParts = function () {
    var i = parts.length;
    while (i--) {
        parts[i].render();
    }
};

var clear = function () {
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "hsla(0, 0%, 0%, .3)";
    ctx.fillRect(0, 0, cw, ch);
    ctx.globalCompositeOperation = "lighter";
};

var loop = function () {
    window.requestAnimFrame(loop, c);
    clear();
    createParts();
    updateParts();
    renderParts();
    globalTick++;
};

window.requestAnimFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (a) {
            window.setTimeout(a, 1e3 / 60);
        }
    );
})();

loop();

var makeItRain = function () {
    //clear out everything
    $(".rain").empty();

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
        //couple random numbers to use for various randomizations
        //random number between 98 and 1
        var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
        //random number between 5 and 2
        var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
        //increment
        increment += randoFiver;
        //add in a new raindrop with various randomizations to certain CSS properties
        drops +=
            '<div class="drop" style="left: ' +
            increment +
            "%; bottom: " +
            (randoFiver + randoFiver - 1 + 100) +
            "%; animation-delay: 0." +
            randoHundo +
            "s; animation-duration: 0.5" +
            randoHundo +
            's;"><div class="stem" style="animation-delay: 0.' +
            randoHundo +
            "s; animation-duration: 0.5" +
            randoHundo +
            's;"></div><div class="splat" style="animation-delay: 0.' +
            randoHundo +
            "s; animation-duration: 0.5" +
            randoHundo +
            's;"></div></div>';
        backDrops +=
            '<div class="drop" style="right: ' +
            increment +
            "%; bottom: " +
            (randoFiver + randoFiver - 1 + 100) +
            "%; animation-delay: 0." +
            randoHundo +
            "s; animation-duration: 0.5" +
            randoHundo +
            's;"><div class="stem" style="animation-delay: 0.' +
            randoHundo +
            "s; animation-duration: 0.5" +
            randoHundo +
            's;"></div><div class="splat" style="animation-delay: 0.' +
            randoHundo +
            "s; animation-duration: 0.5" +
            randoHundo +
            's;"></div></div>';
    }

    $(".rain.front-row").append(drops);
    $(".rain.back-row").append(backDrops);
};

$(".splat-toggle.toggler").on("click", function () {
    $("body").toggleClass("splat-toggle");
    $(".splat-toggle.toggler").toggleClass("active");
    makeItRain();
});

$(".back-row-toggle.toggler").on("click", function () {
    $("body").toggleClass("back-row-toggle");
    $(".back-row-toggle.toggler").toggleClass("active");
    makeItRain();
});

$(".single-toggle.toggler").on("click", function () {
    $("body").toggleClass("single-toggle");
    $(".single-toggle.toggler").toggleClass("active");
    makeItRain();
});

makeItRain();









//var validation = new JustValidate('#form', {
//    errorFieldCssClass: 'is-invalid',
//    errorFieldStyle: {
//        border: '5px solid red'
//    },
//    errorLabelStyle: {
//        fontSize: '12px',
//        color: '#fcee09',
//        margin: '7px 0 0',
//        display: 'flex',
//        alignItems: 'center',
//        justifyContent: 'flex-end'
//    },
//    errorLabelCssClass: 'error',
//    successFieldCssClass: 'is-valid',
//    focusInvalidField: true,
//    lockForm: true,
//    errorsContainer: '.errors-container',
//}, [{
//    \
//    n key: 'Field is required',
//    dict: {
//        ru: 'Поле, обязательное для заполнения'\
//        n
//    }\
//    n
//}, {
//    \
//    n key: 'Name is too short',
//    \n dict: {
//        \
//        n ru: 'Имя слишком короткое'\
//        n
//    }\
//    n
//}, {
//    \
//    n key: 'Name is too long',
//    \n dict: {
//        \
//        n ru: 'Имя слишком длинное'\
//        n
//    }\
//    n
//}, {
//    \
//    n key: 'Email is required',
//    \n dict: {
//        \
//        n ru: 'Email - обязательное поле'\
//        n
//    }\
//    n
//}, {
//    \
//    n key: 'Email is invalid',
//    \n dict: {
//        \
//        n ru: 'Указан некорректный Email'\
//        n
//    }\
//    n
//}, {
//    \
//    n key: 'Phone is invalid',
//    \n dict: {
//        \
//        n ru: 'Указан некорректный телефон'\
//        n
//    }\
//    n
//}, {
//    \
//    n key: 'Message is too short',
//    \n dict: {
//        \
//        n ru: 'Сообщение слишком короткое'\
//        n
//    }\
//    n
//}, {
//    \
//    n key: 'Message is too long',
//    \n dict: {
//        \
//        n ru: 'Сообщение слишком длинное'\
//        n
//    }\
//    n
//}]);\
//nvalidation.setCurrentLocale('ru');\
//nvalidation.addField('#name', [{
//        \
//        n rule: 'required',
//        \n errorMessage: 'Field is required'\
//        n
//    }, {
//        \
//        n rule: 'minLength',
//        \n value: 3,
//        \n errorMessage: 'Name is too short'\
//        n
//    }, {
//        \
//        n rule: 'maxLength',
//        \n value: 30,
//        \n errorMessage: 'Name is too long'\
//        n
//    }]).addField('#email', [{
//        \
//        n rule: 'required',
//        \n errorMessage: 'Email is required'\
//        n
//    }, {
//        \
//        n rule: 'email',
//        \n errorMessage: 'Email is invalid'\
//        n
//    }]).addField('#tel', [{
//                \
//                n rule: 'required',
//                \n value: true,
//                \n errorMessage: 'Field is required'\
//                n
//            }, // {\n// \trule: 'function',\n// \tvalidator: async function () {\n// \t\tconst phone = tel.inputmask.unmaskedvalue();\n// \t\treturn phone.length === 1;\n// \t},\n// \terrorMessage: 'Phone is invalid',\n// },\n{\n  rule: 'minLength',\n  value: 16,\n  errorMessage: 'Phone is invalid'\n} // {\n// \trule: 'maxLength',\n// \tvalue: 16,\n// \terrorMessage: 'Phone is invalid',\n// },\n]).addField('#message', [{\n  rule: 'required',\n  errorMessage: 'Field is required'\n}, // {\n// \tvalidator: (value) => {\n// \t\treturn value[1] === '!';\n// \t},\n// },\n{\n  rule: 'minLength',\n  value: 30,\n  errorMessage: 'Message is too short'\n}, {\n  rule: 'maxLength',\n  value: 150,\n  errorMessage: 'Message is too long'\n}]).onSuccess(function (event) {\n  var _console;\n\n  console.log('Validation passes and form submitted', event);\n  var formData = new FormData(event.target);\n\n  (_console = console).log.apply(_console, _toConsumableArray(formData));\n\n  var xhr = new XMLHttpRequest();\n\n  xhr.onreadystatechange = function () {\n    if (xhr.readyState === 4) {\n      if (xhr.status === 200) {\n        console.log('Отправлено');\n      }\n    }\n  };\n\n  xhr.open('POST', 'mail.php', true);\n  xhr.send(formData);\n  event.target.reset();\n  validation.refresh();\n});\n\nfunction eraseText() {\n  // document.getElementById('message').innerHTML = '';\n  // document.getElementById('name').innerHTML = '';\n  // document.getElementById('email').innerHTML = '';\n  // document.getElementById('tel').innerHTML = '';\n  // validation.destroy();\n  // validation.removeField('#name');\n  validation.refresh();\n}\n\ndocument.getElementById('cancel').addEventListener('click', function () {\n  // eraseText();\n  validation.refresh();\n}); // $(\"#form-two\").submit(function() { //Change\n// \tvar th = $(this);\n// \t$.ajax({\n// \t\ttype: \"POST\",\n// \t\turl: \"mail.php\", //Change\n// \t\tdata: th.serialize()\n// \t}).done(function() {\n// \t\talert(\"Thank you!\");\n// \t\tsetTimeout(function() {\n// \t\t\t// Done Functions\n// \t\t\tth.trigger(\"reset\");\n// \t\t}, 1000);\n// \t});\n// \treturn false;\n// });\n\n//# sourceURL=webpack://mytemplate/../%00#PORTFOLIO_2.0/src/pug/components/contacts/contacts.js?)
//        },
