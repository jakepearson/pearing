(ns advent.day-1-test
  (:require [clojure.test :refer [deftest is]]
            [advent.util :as util]
            [advent.day-1 :as day-1]))

(deftest simple
  (is (= 3 (day-1/process "+1 +1 +1"))))

(deftest negative
  (is (= -6 (day-1/process "-3 -2 -1"))))

(deftest big
  (let [text (util/read-txt "day-1.txt")]
    (is (= 561 (day-1/process text)))))