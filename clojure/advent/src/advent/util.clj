(ns advent.util
  (:require [clojure.string :as string]
            [clojure.pprint :refer [pprint]]))

(defn read-txt [name]
  (->> (str "resources/" name)
       slurp))

(defn pp [value]
  (pprint value)
  value)

(defn split [input]
  (let [result (string/split input #"\s")]
    (println "RR: " result)
    result))
