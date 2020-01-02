(ns advent.day-1
  (:require [clojure.string :as string]))

(defn process [input]
  (let [words (-> input
                  (string/split #"\s"))]
    (->> words
         (map (fn [word]
                (Integer/parseInt word)))
         (reduce +))))
