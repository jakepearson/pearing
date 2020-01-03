(ns advent.day-1
  (:require [advent.util :as util]))

(defn process [input]
  (->> input
       util/split
       (map (fn [word]
              (Integer/parseInt word)))
       (reduce +)))
