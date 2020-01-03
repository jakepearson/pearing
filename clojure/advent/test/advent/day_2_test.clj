(ns advent.day-2-test
  (:require [clojure.test :refer [deftest is]]
            [advent.util :as util]
            [advent.day-2 :as day-2]))

(deftest has-2
  (is (day-2/has-2? "aaabb"))
  (is (not (day-2/has-2? "abc")))
  (is (not (day-2/has-2? "aaa"))))

(deftest has-3
  (is (day-2/has-3? "aaabb"))
  (is (not (day-2/has-3? "abc")))
  (is (not (day-2/has-3? "aaaa"))))

(deftest simple
  (is (= 12 (day-2/checksum "bababc abbcde abcccd aabcdd abcdee ababab"))))

(deftest solution
  (is (= 5456 (day-2/checksum (util/read-txt "day-2.txt")))))