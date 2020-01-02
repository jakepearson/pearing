(ns advent.day-1-test
  (:require [clojure.test :refer [deftest is]]
            [clojure.java.io :as io]
            [advent.day-1 :as day-1]))

(defn read-txt [name]
  (->> name
       io/resource
       slurp))

(deftest simple
  (is (= 3 (day-1/process "+1 +1 +1"))))

(deftest negative
  (is (= -6 (day-1/process "-3 -2 -1"))))

(deftest big
  (let [text (read-txt "day_1.txt")]
    (println "farts" text)
    (is (= "help" (day-1/process text)))))