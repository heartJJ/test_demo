
 var lengthOfLongestSubstring = function(s) {
   const map = new Map();
   s.split('').forEach((c, index) => {
     const arr = map.get(c) || [];

     if (arr.length) {
       arr.push(index);
     } else {
       map.set(c, [ index ]);
     }
   });

   let max = s.length;
   for (let arr of map.values()) {
     let singleMin = arr.reduce((p,c) => {
       const cal = c - p;
       return p < cal ? p : cal;
     }, s.length);

     console.log(arr);
     console.log(singleMin);

     if ( singleMin < max ) {
       max = singleMin;
     }
   }

   return max;
 };

 const s = 'abcabcbb';
 console.log(lengthOfLongestSubstring(s));