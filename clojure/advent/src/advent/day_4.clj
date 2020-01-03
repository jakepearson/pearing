(ns advent.day-4
  (:require   [clojure.string :as string]))

(defn reactable? [input index]
  (let [a (nth input index)
        b (nth input (inc index))]
    (and (not (= a b))
         (= (string/upper-case a) (string/upper-case b)))))

(defn snip [input index]
  (-> (concat (subvec input 0 index) (subvec input (+ 2 index)))
      vec))

(defn react [input index]
  (if (reactable?  input index)
    (snip input index)
    input))

(defn full-reaction [input]
  (-> (loop [input (vec input)
             index 0]
        (cond
          (> (+ index 2) (count input)) input
          (reactable? input index) (recur (snip input index)
                                          (if (= index 0)
                                            0
                                            (dec index)))
          :else (recur input (inc index))))
      count))