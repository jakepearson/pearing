(ns advent.day-3
  (:require   [clojure.string :as string]))

(defn parse [line]
  (let [parts (-> line
                  (string/replace #"\s" "")
                  (string/split #"@|:|,|x")
                  rest)]
    (mapv (fn [n] (Integer/parseInt n)) parts)))

(defn update-cell [database [x y]]
  (let [key (str x "-" y)]
    (update database key (fn [v] (if (nil? v)
                                   1
                                   (inc v))))))

(defn process-line [database line]
  (let [[x y w h] (parse line)
        cells     (for [i (range w)
                        j (range h)]
                    [(+ x i) (+ y j)])]
    (reduce update-cell database cells)))

(defn has-overlap? [[_ val]]
  (> val 1))

(defn overlaps [input]
  (->> (string/split input #"\n")
       (reduce process-line {})
       (filter has-overlap?)
       count))