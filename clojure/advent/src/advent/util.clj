(ns advent.util
  (:require [clojure.string :as string]))

(defn read-txt [name]
  (->> (str "resources/" name)
       slurp))

(defn split [input]
  (string/split input #"\s"))