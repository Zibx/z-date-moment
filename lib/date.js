(function (undefined) {
        var globalScope = typeof global !== 'undefined' ? global : this,
        oldGlobalMoment,
        hasModule = (typeof module !== 'undefined' && module && module.exports);

var ZD = (function(){
    var Locale = function(cfg){
        f.apply(this, cfg);
        this._relativeTime = this.relativeTime;
        delete this.relativeTime;
    };
    Locale.prototype = {
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },
        postformat : function (string) {
            return string;
        }
    };
    var D = function( date ){
            this.parse( date );
        },
        replacer = function( arr ){
            return RegExp( '(' +
            arr
                .sort( function( a, b ){
                    return b.length - a.length;
                } )
                .map( function( el ){
                    return el.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&" );
                } )
                .join( '|' )
            + ')', 'g' );
        },
        toString = Object.prototype.toString,
        type = function( el ){
            el = toString.call(el).substr(8);
            return el.substr(0,el.length - 1 ).toLowerCase();
        },
        locales = {},
        proto = D.prototype = {
            relativeTimeThresholds: {
                s: 45,  // seconds to minute
                m: 45,  // minutes to hour
                h: 22,  // hours to day
                d: 26,  // days to month
                M: 11   // months to year
            },
            parse: function( date ){
                
                if(date instanceof D){
                    this._d = new Date(+date._d);
                }else{

                    var t = type( date );
                    
                    if( date === void 0 )
                        this._d = new Date();
                    else
                        this._d = new Date( 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 );
                    if( t === 'number' || t === 'date')
                        this._d.setTime( date );
                    if( t === 'array' ){
                        date = date.concat([0,0,1,0,0,0,0,0].slice(date.length));
                        this._d.setFullYear.apply( this._d, date);
                        this._d.setHours.apply( this._d, date.slice(3) );
                    }else if( t === 'object' )
                        for( t in date )
                            this.set( t, date[t] );
                    
                }
                return this;
            },
            toDate: function(  ){
                return new Date(this._d);
            },
            get: function( type ){
                return this[type]();
            },
            clone: function(  ){
                return new D(this._d);
            },
            set: function( type, val ){
                this[type]( val ); return this;
            },
            valueOf: function(  ){
                return +this._d;
            },
            lengths: {

            },
            add: function( count, type, sub ){
                if( typeof count === 'object' ){
                    for( var i in count )
                        count.hasOwnProperty(i) && this.add(i, count[i]);
                }else if( this[count] ){
                    this.set( count, (this.get( count )|0) + type*-(!!sub*2-1) );
                }else{
                    this.set( type, (this.get( type )|0) + count*-(!!sub*2-1) );
                }

                return this;
            },
            subtract: function( count, type ){
                return this.add(count, type, true);
            },
            count: function( type, d1, d2 ){
                type = this[type].baseName;
                var d = Math.abs(+this._d), a = Math.floor;
                if(type === 'millisecond')
                    return d;
                d = a(d/1000);
                if(type === 'second')
                    return d;
                d = a(d/60);
                if(type === 'minute')
                    return d;
                d = a(d/60);
                if(type === 'hour')
                    return d;
                d = a(d/24);
                if(type === 'date' || type === 'day')
                    return d;
                if(type === 'week')
                    return a(d/7);
                if(type === 'month'){
                    d1 = new D(d1);
                    d2 = new D(d2);
                    return d1.year()*12+d1.month()-d2.year()*12-d2.month();
                }if(type === 'year')
                    return new D(d1).year()-new D(d2).year();
                return +this._d;
            },
            diff: function(d, type){
                var date = new D(d),
                    diff = this._d - date._d;
                    
                date._d = new Date(diff);
                return type ? date.count(type, this, d)|0: diff;
            },
            daysInMonth: function(  ){
                var d = new Date(this._d);

                d.setDate( 1 );
                d.setMonth( d.getMonth() + 1 );
                d.setDate( 0 );
                return d.getDate();
            },
            isLeapYear: function(  ){
                var d = new Date(this._d);
                d.setMonth(1);d.setDate(29);
                return d.getDate() === 29;
            },
            substituteTimeAgo: function(string, number, withoutSuffix, isFuture, locale) {
        return locales[this.locale].relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    },
            relativeTime: function(withoutSuffix, locale) {
                var rT = this.relativeTimeThresholds,
                    f = Math.floor,
                    _d = Math.abs(+this._d),
                    s = f(_d/1000+0.5),
                    m = f(s/60+0.5),
                    h = f(m/60+0.5),
                    d = f(h/24+0.5),
                    M = f(d * 4800 / 146097+0.5 ),
                    y = f(d * 400 / 146097+0.5),
        
                    args = s < rT.s && ['s', s] ||
                        m === 1 && ['m'] ||
                        m < rT.m && ['mm', m] ||
                        h === 1 && ['h'] ||
                        h < rT.h && ['hh', h] ||
                        d === 1 && ['d'] ||
                        d < rT.d && ['dd', d] ||
                        M === 1 && ['M'] ||
                        M < rT.M && ['MM', M] ||
                        y === 1 && ['y'] || ['yy', y];
        
                args[2] = withoutSuffix;
                args[3] = +_d > 0;
                return this.substituteTimeAgo.apply(this, args);
            },
            humanize : function (withSuffix) { // from moment
                var output = this.relativeTime(!withSuffix);
                if (withSuffix) {
                    output = locales[this.locale].pastFuture(+this, output);
                }
    
                return locales[this.locale].postformat(output);
            },
            from: function( d, suffix ){
                d = new D(-this.diff(d));
                return d.humanize(suffix);
            },
            format: function( tpl ){
                return (
                (this.formatCache && this.formatCache[tpl]) ||
                ((this.formatCache = this.formatCache || {})[tpl] = this.formatter( tpl ))).call( this );
            },
            formatter: function( tpl ){
                var long = locales[this.locale].longDateFormat,
                    wereReplaces;
                do{
                    wereReplaces = false;
                    tpl = tpl.replace( replacer( Object.keys( long ) ), function( a, b ){
                        wereReplaces = true;
                        return long[b];
                    } );
                }while( wereReplaces );

                var fnCode = tpl.replace( replacer( Object.keys( proto ) ), function( a, b ){
                    return '\'+this[\'' + b + '\']()+\'';
                } );
                return new Function( '', 'return \'' + fnCode + '\';' )
            },
            '12': function( text ){
                return text % 12 || 12;
            },
            shortMonth: function(){
                return locales[this.locale].monthsShort[this.month()];
            },
            fullMonth: function(){
                return locales[this.locale].months[this.month()];
            },
            am: function(){
                return locales[this.locale].am[(this.hour() > 11) | 0];
            },
            '+1': function( val ){
                return (val | 0) + 1;
            },
            defineLocale: function( name, data ){
                locales[name] = new Locale(data);
            },
            locale: 'en-gb',
            defaultFormat: 'ISO',
            _week: function( val ){
                var startOfYear = ( new Date( this.year(), 0, 1, 0, 0, 0 ) ),
                    week = locales[this.locale].week.dow;
                if(val){
                    this._d.setTime( startOfYear.valueOf() +
                        ( 7 * val -
                            (startOfYear.getDay() - week + 7) % 7 +
                            week
                        ) * ( 1000 * 60 * 60 * 24 ) );

                    return this;
                }else
                        daysFromStart = (
                            ( new Date( this.year(), this.month()-1, this.date(), 0, 0, 0 ) ).valueOf() // current date
                                -
                                startOfYear.valueOf()
                            )
                            /
                            ( 1000 * 60 * 60 * 24 ) + (startOfYear.getDay() - week + 7) % 7; // day length

                    return ( daysFromStart / 7 )|0;
            }
        };

    var f = {
        apply: function( a, b ){
            for( var i in b )
                a[i] = b[i];
            return a;
        },
        capitalize: function( text ){
            return text.charAt( 0 ).toLocaleUpperCase() + text.substr( 1 );
        },
        tail: function( count, val ){
            return (val + '').substr( -count );
        },
        padding: function( count, text, symbol ){
            text += '';
            var textLength = text.length;
            return ( textLength < count ? ( new Array( count - textLength + 1 ) ).join( symbol || '0' ) : '' ) + text;
        },
        big: function( text ){
            return text.toLocaleUpperCase();
        }
    };
    for(var i = 4; i > 0; i--){
        f['p'+i] = f.padding.bind( null, i );
        f['t'+i] = f.tail.bind( null, i );
    }

//magic shit. | - synonims, : - modifiers

    ('getFullYear;year|YY:t2|YYYY:p4,' +
    'getMonth;month|M:+1|MM:+1:p2|MMM:shortMonth|MMMM:fullMonth,' +
    'getDate;date|D|DD:p2|d|dd:p2,' +
    'hour|H|HH:p2|h:12|hh:12:p2|a:am|A:am:big,' +
    'minute|m|mm:p2,' +
    'second|s|ss:p2,' +
    'millisecond|ms|SSS:p3,' +
    '+_week;week|w|ww:p2|W|WW:p2').split( ',' ).forEach( function( el ){
            var item = el.split( '|' ),
                first = item[0].split( ';' ),
                firstCount = first.length,

                fn = firstCount > 1 ? first[0] : 'get' + f.capitalize( first[0] ) + 's',
                baseFn = fn[0] === '+'?'this.'+ fn.substr(1) +'()':'this._d.' + fn + '()',
                baseSetter = '('+baseFn.replace('get','set' ).replace('()','(val)')+',this)',
                base = new Function( 'val', 'return val === void 0?' + baseFn + ':'+baseSetter+';' ),
                tokens = (item[0] = first[firstCount - 1]).split( ':' ),
                name = tokens[0];
            tokens[0] += 's';
            item.push( tokens.join( ':' ) );


            item.forEach( function( el ){

                var tokens = el.split( ':' ),

                    fn = proto[tokens[0]] = tokens.length === 1 ? base :
                    new Function( 'val', 'return val === void 0 ?' + tokens
                            .slice( 1 )
                            .reverse()
                            .map( function( el ){
                                return 'this["' + el + '"]';
                            } )
                            .join( '(' )
                        + '(' + baseFn
                        + new Array( tokens.length )
                            .join( ')' )
                        + ':'+baseSetter+';'
                    );
                fn.baseName = name;
            } )


        } );
    f.apply( proto, f );
    var Factory = function( a ){
        return new D( a );
    };
    Factory.defineLocale = proto.defineLocale;
    Factory.prototype = D.prototype;
    return Factory;

})();
window.moment = ZD;
moment.defineLocale('en-gb', {
        months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        am: ['am', 'pm'],
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd, D MMMM YYYY LT',
            ISO: 'YYYY-MM-DDTHH:mm:ssZ'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal() {
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        globalScope.moment = moment;
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === 'function' && define.amd) {
        define('moment', function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);