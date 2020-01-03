(ns advent.day-4-test
  (:require [clojure.test :refer [deftest is]]
            [advent.util :as util]
            [advent.day-4 :as day-4]))

(deftest snip
  (let [input [1 2 3 4]]
    (is (= [1 2] (day-4/snip input 2)))
    (is (= [3 4] (day-4/snip input 0)))))

#(deftest big
   (is (= 0 (day-4/full-reaction (util/read-txt "day-4.txt")))))

(deftest small
  (is (= 10 (day-4/full-reaction "dabAcCaCBAcCcaDA"))))