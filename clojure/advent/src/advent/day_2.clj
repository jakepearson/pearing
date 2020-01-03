(ns advent.day-2
  (:require [advent.util :as util]
            [clojure.string :as string]))

(defn- has-n? [n input]
  (let [sorted  (-> input sort string/join)
        matches (re-seq #"(.)\1{1,}" sorted)]
    (some (fn [[match]]
            (= n (count match)))
          matches)))

(def has-2? (partial has-n? 2))
(def has-3? (partial has-n? 2))

(defn- counter [n input]
  (->> input
       util/split
       (filter (partial has-n? n))
       count))

(defn checksum [input]
  (* (counter 2 input)
     (counter 3 input)))