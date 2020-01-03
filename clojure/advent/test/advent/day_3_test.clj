(ns advent.day-3-test
  (:require [clojure.test :refer [deftest is]]
            [advent.util :as util]
            [advent.day-3 :as day-3]))

(deftest parse-line
  (is (= [1 3 4 4] (day-3/parse "#1 @ 1,3: 4x4"))))

(deftest process-line
  (is (= {"1-3" 1
          "2-3" 1} (day-3/process-line {} "#1 @ 1,3: 2x1"))))

(deftest overlaps-small
  (is (= 4 (day-3/overlaps "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2"))))

(deftest overlaps-large
  (is (= 0 (-> "day-3.txt" util/read-txt day-3/overlaps))))