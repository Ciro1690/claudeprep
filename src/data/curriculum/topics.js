// Each topic has:
//   id, title, category, level ('beginner'|'intermediate'|'advanced')
//   languages: null (all) | string[] (specific languages)
//   estimatedMinutes, summary
//   sections: array of { type: 'paragraph'|'bullets'|'code', heading, body|items|snippet+language+note }

export const topics = [

  // ─── CODING PROBLEMS ────────────────────────────────────────────────────────

  {
    id: 'two-pointers',
    title: 'Two Pointers',
    category: 'coding-problems',
    level: 'beginner',
    languages: null,
    estimatedMinutes: 20,
    summary: 'Use two index variables moving through an array to reduce O(n²) solutions to O(n).',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'The two pointers technique uses two index variables that move through a data structure — usually an array — to solve problems more efficiently than nested loops. This pattern commonly reduces time complexity from O(n²) to O(n).',
      },
      {
        type: 'bullets',
        heading: 'When to use it',
        items: [
          'Finding a pair in a sorted array that meets a condition (e.g., sum equals target)',
          'Removing duplicates from a sorted array in-place',
          'Checking if a string is a palindrome',
          'Merging two sorted arrays',
        ],
      },
      {
        type: 'code',
        heading: 'Example: Two Sum II (sorted array)',
        language: 'pseudocode',
        snippet: `function twoSum(numbers, target):
    left = 0
    right = length(numbers) - 1

    while left < right:
        sum = numbers[left] + numbers[right]
        if sum == target:
            return [left + 1, right + 1]
        else if sum < target:
            left++
        else:
            right--

    return []`,
        note: 'Start left at index 0 and right at the last index. If the sum is too small, move left forward. If too large, move right backward.',
      },
      {
        type: 'bullets',
        heading: 'Key patterns',
        items: [
          'Opposite ends: start at both ends, move toward center (palindrome, sorted pair)',
          'Same direction: both pointers move forward at different speeds (slow/fast or partition)',
          'Always ask: does sorting the input first enable this pattern?',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the main time complexity improvement of the two pointers technique?',
        options: ['O(n log n) to O(n)', 'O(n²) to O(n)', 'O(n) to O(1)', 'O(n²) to O(log n)'],
        answer: 1,
        explanation: 'By using two index variables instead of nested loops, two pointers reduces many O(n²) brute-force solutions to O(n) — each pointer moves at most n steps total.',
      },
      {
        question: 'In the Two Sum II solution on a sorted array, when the current sum is too large, what do you do?',
        options: ['Move left forward', 'Move right forward', 'Move right backward', 'Move both inward'],
        answer: 2,
        explanation: 'Moving the right pointer left picks a smaller value, reducing the sum. Moving left forward would increase the sum further.',
      },
      {
        question: 'Which problem is a classic fit for the opposite-ends two pointer variant?',
        options: [
          'Merging two unsorted arrays',
          'Finding a pair in a sorted array that sums to a target',
          'Finding the most frequent element',
          'Counting subarrays with equal 0s and 1s',
        ],
        answer: 1,
        explanation: 'Opposite-ends works when the array is sorted and you need to find a pair meeting a condition. Starting at both ends and moving inward eliminates half the candidates each step.',
      },
      {
        question: 'What is a prerequisite for using two pointers to find a pair with a target sum?',
        options: [
          'The array must have no duplicates',
          'The array must be sorted',
          'The array must be a string',
          'The array must have an even number of elements',
        ],
        answer: 1,
        explanation: 'Two pointers on a pair-sum problem rely on sorted order to know which direction to move. On an unsorted array you would need a hash map instead.',
      },
      {
        question: 'Which pattern uses two pointers moving in the same direction at different speeds?',
        options: ['Palindrome check', 'Sorted pair sum', 'Fast/slow pointer (cycle detection, finding middle)', 'Binary search'],
        answer: 2,
        explanation: 'Same-direction pointers (fast moves 2 steps, slow moves 1) are used for cycle detection in linked lists and finding the middle node — not for the opposite-ends sorted-pair pattern.',
      },
    ],
  },

  {
    id: 'sliding-window',
    title: 'Sliding Window',
    category: 'coding-problems',
    level: 'beginner',
    languages: null,
    estimatedMinutes: 20,
    summary: 'Maintain a window of elements that expands and contracts to track a running condition across a sequence.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: "The sliding window pattern solves problems that ask about a contiguous subarray or substring. Instead of recomputing from scratch for each window position, you expand or shrink the window incrementally — keeping track of a running state (sum, frequency map, etc.).",
      },
      {
        type: 'bullets',
        heading: 'When to use it',
        items: [
          'Maximum/minimum sum subarray of size k',
          'Longest substring without repeating characters',
          'Smallest subarray with sum ≥ target',
          'Any problem mentioning "contiguous subarray/substring"',
        ],
      },
      {
        type: 'code',
        heading: 'Example: Longest Substring Without Repeating Characters',
        language: 'pseudocode',
        snippet: `function lengthOfLongestSubstring(s):
    seen = {}   // char -> last seen index
    maxLen = 0
    left = 0

    for right from 0 to length(s) - 1:
        if s[right] in seen and seen[s[right]] >= left:
            left = seen[s[right]] + 1
        seen[s[right]] = right
        maxLen = max(maxLen, right - left + 1)

    return maxLen`,
        note: 'The left pointer only moves right, shrinking the window when a duplicate is found. Window size = right - left + 1.',
      },
      {
        type: 'bullets',
        heading: 'Fixed vs. variable window',
        items: [
          'Fixed size: move both pointers together (add right element, remove left element)',
          'Variable size: expand right until condition is violated, then shrink from left',
          'Track state with a sum, counter, or frequency dictionary',
        ],
      },
    ],
    quiz: [
      {
        question: 'What type of problem is the sliding window pattern designed for?',
        options: [
          'Problems on trees',
          'Problems involving contiguous subarrays or substrings',
          'Problems on graphs',
          'Problems requiring sorted input',
        ],
        answer: 1,
        explanation: 'Sliding window is the pattern of choice whenever a problem asks about a contiguous subarray or substring — max/min sum of size k, longest substring without repeating chars, etc.',
      },
      {
        question: 'In a variable-size window, when do you shrink the window from the left?',
        options: [
          'When the right pointer reaches the end of the array',
          'When the window condition is violated',
          'When the window size exceeds a fixed limit',
          'When a duplicate is found anywhere in the array',
        ],
        answer: 1,
        explanation: 'Expand right to add elements, then shrink from left until the condition is restored. The left pointer only ever moves right, so the overall algorithm is O(n).',
      },
      {
        question: 'Given left and right pointer positions, what is the current window size?',
        options: ['right - left', 'right - left + 1', 'right + left', 'right + left - 1'],
        answer: 1,
        explanation: 'A window from index left to right (inclusive) contains right - left + 1 elements. The +1 accounts for the element at the left index itself.',
      },
      {
        question: 'For a fixed-size window sliding one step right, which two operations maintain it?',
        options: [
          'Add left element, remove right element',
          'Add right element, remove left element',
          'Add both endpoints, then remove both',
          'Replace left with right without updating state',
        ],
        answer: 1,
        explanation: 'As the window slides right, the new right element enters the window and the old left element leaves. Updating running state incrementally keeps the solution O(n).',
      },
      {
        question: 'What data structure is commonly used to track character frequency in a sliding window substring problem?',
        options: ['Stack', 'Queue', 'Frequency dictionary / character map', 'Min-heap'],
        answer: 2,
        explanation: 'A dictionary mapping each character to its count lets you check window validity in O(1) as the window expands and contracts — essential for problems like "minimum window substring".',
      },
    ],
  },

  {
    id: 'hash-maps',
    title: 'Hash Maps & Hash Sets',
    category: 'coding-problems',
    level: 'beginner',
    languages: null,
    estimatedMinutes: 15,
    summary: 'Trade space for speed — use a hash map to reduce lookup and deduplication from O(n) to O(1).',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Hash maps (Dictionary in C#) and hash sets (HashSet) give O(1) average-time lookups, inserts, and deletes. They are the most common tool for eliminating nested loops in interview problems.',
      },
      {
        type: 'bullets',
        heading: 'When to use it',
        items: [
          'Counting frequency of elements',
          'Checking if an element was seen before (deduplication)',
          'Two Sum pattern: check if complement exists',
          'Grouping elements by a computed key (e.g., anagram groups)',
        ],
      },
      {
        type: 'code',
        heading: 'Example: Two Sum (unsorted)',
        language: 'pseudocode',
        snippet: `function twoSum(nums, target):
    seen = {}   // value -> index

    for i from 0 to length(nums) - 1:
        complement = target - nums[i]
        if complement in seen:
            return [seen[complement], i]
        seen[nums[i]] = i

    return []`,
        note: 'For each number, check if its complement already exists in the map. This runs in O(n) time and O(n) space.',
      },
      {
        type: 'bullets',
        heading: 'Common operations',
        items: [
          'get(key) — retrieve a value by key; signals absence if missing',
          'get(key, default) — retrieve with a fallback value if key is absent',
          'contains(key) — O(1) check whether a key exists in the map',
          'set.contains(val) — O(1) membership test for a hash set',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the average time complexity of a hash map lookup?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        answer: 2,
        explanation: 'Hash maps compute a hash of the key to find the bucket directly, giving O(1) average-case for get, put, and delete. Worst case (all keys collide) is O(n) but rare in practice.',
      },
      {
        question: 'In the Two Sum hash map solution, what is stored as the key in the dictionary?',
        options: ['The index', 'The number itself', 'The complement', 'The target'],
        answer: 1,
        explanation: 'The map stores number → index. For each new number you compute complement = target - num and check if that complement is already a key — giving O(1) lookup instead of a second loop.',
      },
      {
        question: 'What is the safest way to retrieve a value that might not exist in a hash map?',
        options: [
          'Direct index access — map[key]',
          'Check for key existence first, then access',
          'Always access without checking and catch the error',
          'Use a sorted array instead',
        ],
        answer: 1,
        explanation: 'Check whether the key exists before accessing it (or use a get-with-default method). Directly accessing a missing key typically throws an exception or returns undefined depending on the language.',
      },
      {
        question: 'What trade-off does using a hash map usually make compared to a brute-force nested loop?',
        options: [
          'Better time at the cost of more space',
          'Better space at the cost of more time',
          'Both time and space improve',
          'Better time and better space than brute force',
        ],
        answer: 0,
        explanation: 'Hash maps turn O(n²) time (nested loops) into O(n) time by storing previously seen values, but require O(n) extra space for the map. Classic time–space tradeoff.',
      },
      {
        question: 'Which collection should you use when you only need to check membership, not store key-value pairs?',
        options: ['A hash map (key → value)', 'A sorted list', 'A hash set', 'A stack'],
        answer: 2,
        explanation: 'A hash set stores unique elements with O(1) add and membership checks. Using a full hash map just to track presence wastes memory on unnecessary values.',
      },
    ],
  },

  {
    id: 'binary-search',
    title: 'Binary Search',
    category: 'coding-problems',
    level: 'beginner',
    languages: null,
    estimatedMinutes: 20,
    summary: 'Repeatedly halve the search space on sorted data to find a target in O(log n) time.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: "Binary search is the go-to algorithm whenever your input is sorted. Every iteration eliminates half the remaining candidates, giving O(log n) time. In interviews, binary search is also a thinking tool — 'can I binary search on the answer?' is a powerful question for optimization problems.",
      },
      {
        type: 'code',
        heading: 'Classic template',
        language: 'pseudocode',
        snippet: `function binarySearch(nums, target):
    left = 0
    right = length(nums) - 1

    while left <= right:
        mid = left + (right - left) / 2   // avoids overflow
        if nums[mid] == target:
            return mid
        else if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1   // not found`,
        note: 'Use left + (right - left) / 2 instead of (left + right) / 2 to prevent integer overflow on large arrays.',
      },
      {
        type: 'bullets',
        heading: 'Variations to know',
        items: [
          'Find leftmost/rightmost occurrence — adjust to not return immediately on match',
          'Search in rotated sorted array — determine which half is sorted first',
          'Binary search on the answer — e.g., "minimum maximum" or "capacity" problems',
          'Always ask: is the search space monotonically ordered?',
        ],
      },
      {
        type: 'bullets',
        heading: 'Common mistakes',
        items: [
          'left < right vs left <= right — the choice affects single-element array handling',
          'Forgetting mid + 1 / mid - 1 (causes infinite loop if you use mid directly)',
          'Off-by-one errors when searching for left or right boundaries',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'],
        answer: 2,
        explanation: 'Each iteration halves the remaining search space. Starting from n elements, you need at most log₂(n) iterations to find the target or exhaust the space.',
      },
      {
        question: 'Why calculate mid as `left + (right - left) / 2` instead of `(left + right) / 2`?',
        options: [
          'It runs faster on modern hardware',
          'It avoids integer overflow when left and right are large',
          'It works on unsorted arrays',
          'It handles duplicate values more accurately',
        ],
        answer: 1,
        explanation: 'If left and right are both near Int32.MaxValue, their sum overflows. `left + (right - left) / 2` computes the same midpoint arithmetically without the overflow risk.',
      },
      {
        question: 'What condition does the classic binary search while-loop use?',
        options: ['left < right', 'left <= right', 'left != right', 'right > 0'],
        answer: 1,
        explanation: '`left <= right` ensures the single-element case (left == right) is still checked. Using `left < right` would miss this and could return -1 incorrectly when the target is the last remaining element.',
      },
      {
        question: 'When `nums[mid] < target`, what update do you make?',
        options: ['right = mid', 'left = mid', 'left = mid + 1', 'right = mid - 1'],
        answer: 2,
        explanation: 'The target is in the right half, so you move left past mid. Using `left = mid` (without +1) can cause an infinite loop when left and right are adjacent.',
      },
      {
        question: 'What property must the input have for binary search to work correctly?',
        options: [
          'Elements must be unique',
          'Input must be an array, not a list',
          'Input must be sorted',
          'Input must be sorted and have no duplicates',
        ],
        answer: 2,
        explanation: 'Binary search relies on sorted order to decide which half to discard. Duplicates are fine — they require extra care only when searching for leftmost/rightmost boundaries.',
      },
    ],
  },

  {
    id: 'trees-bfs-dfs',
    title: 'Trees: BFS & DFS',
    category: 'coding-problems',
    level: 'intermediate',
    languages: null,
    estimatedMinutes: 30,
    summary: 'Traverse trees level-by-level (BFS) or depth-first (DFS) to solve the majority of binary tree interview questions.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Binary trees are one of the most common interview topics. Breadth-first search (BFS) uses a queue and visits nodes level by level — useful for shortest paths and level-order problems. Depth-first search (DFS) uses recursion (or a stack) and visits in pre/in/post order — useful for path sums, depth calculations, and structural checks.',
      },
      {
        type: 'code',
        heading: 'DFS: Recursive traversal',
        language: 'pseudocode',
        snippet: `function inorderTraversal(root):
    result = []
    dfs(root, result)
    return result

function dfs(node, result):
    if node == null: return
    dfs(node.left, result)    // left
    result.add(node.val)      // root
    dfs(node.right, result)   // right`,
        note: 'Pre-order: root → left → right. In-order: left → root → right. Post-order: left → right → root.',
      },
      {
        type: 'code',
        heading: 'BFS: Level order traversal',
        language: 'pseudocode',
        snippet: `function levelOrder(root):
    result = []
    if root == null: return result

    queue = [root]

    while queue is not empty:
        levelSize = length(queue)
        level = []
        repeat levelSize times:
            node = queue.dequeue()
            level.add(node.val)
            if node.left != null: queue.enqueue(node.left)
            if node.right != null: queue.enqueue(node.right)
        result.add(level)

    return result`,
        note: 'Snapshot the queue size at the start of each outer loop to process exactly one level per iteration.',
      },
      {
        type: 'bullets',
        heading: 'When to use each',
        items: [
          'BFS: shortest path, level-by-level output, "minimum depth"',
          'DFS: path sums, max/min depth, subtree checks, validate BST',
          'Recursion naturally expresses DFS — trust the call stack',
          'Always check for null nodes at the start of recursive functions',
        ],
      },
    ],
    quiz: [
      {
        question: 'Which data structure does BFS use to track nodes to visit?',
        options: ['Stack', 'Queue', 'HashSet', 'Priority Queue'],
        answer: 1,
        explanation: 'BFS uses a Queue (FIFO). Nodes are enqueued when discovered and dequeued for processing, ensuring every node at depth N is visited before any node at depth N+1.',
      },
      {
        question: 'What is the correct order for in-order DFS traversal of a binary tree?',
        options: [
          'Root → Left → Right',
          'Left → Right → Root',
          'Left → Root → Right',
          'Right → Root → Left',
        ],
        answer: 2,
        explanation: 'In-order is Left → Root → Right. For a BST this produces values in sorted ascending order. Pre-order is Root → Left → Right; post-order is Left → Right → Root.',
      },
      {
        question: 'In the BFS level-order template, why do you snapshot `queue.Count` before the inner loop?',
        options: [
          'To avoid an infinite loop',
          'To process exactly the nodes from the current level before moving to the next',
          'Because Queue.Count is expensive to call repeatedly',
          'To keep track of the total number of nodes visited',
        ],
        answer: 1,
        explanation: 'Snapshotting levelSize = queue.Count at the start of each outer iteration captures exactly how many nodes are on the current level. The inner loop processes only those, while new children are added for the next level.',
      },
      {
        question: 'Which traversal would you use to find the maximum depth of a binary tree?',
        options: [
          'BFS — it visits nodes level by level so depth is naturally tracked',
          'DFS — recurse to find max(left depth, right depth) + 1',
          'Either works equally well',
          'Neither — you need a special algorithm',
        ],
        answer: 2,
        explanation: 'Both work. DFS is usually more concise (return 1 + max(dfs(left), dfs(right))). BFS also works by counting levels. In interviews, DFS is the more common approach for depth problems.',
      },
      {
        question: 'What is the base case for most recursive DFS tree functions?',
        options: [
          'When the node has no children',
          'When node == null',
          'When the node value equals the target',
          'When the recursion depth exceeds tree height',
        ],
        answer: 1,
        explanation: 'Checking for null first handles both empty trees and leaf node children uniformly. Without this base case, accessing node.left or node.val on a null reference causes a runtime error.',
      },
    ],
  },

  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    category: 'coding-problems',
    level: 'intermediate',
    languages: null,
    estimatedMinutes: 35,
    summary: 'Break overlapping subproblems into smaller pieces and cache results to avoid redundant work.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Dynamic programming (DP) solves problems by breaking them into overlapping subproblems and storing results to avoid recomputation. Two approaches: top-down (memoization — recursion + cache) and bottom-up (tabulation — fill a table iteratively). DP applies when a problem has optimal substructure and overlapping subproblems.',
      },
      {
        type: 'bullets',
        heading: 'Identifying DP problems',
        items: [
          '"How many ways to..." — counting problems',
          '"Minimum/maximum cost/steps to..." — optimization problems',
          'Decision at each step: take or skip, go left or right',
          'If brute force is exponential and subproblems repeat, DP likely applies',
        ],
      },
      {
        type: 'code',
        heading: 'Example: Climbing Stairs (bottom-up)',
        language: 'pseudocode',
        snippet: `function climbStairs(n):
    if n <= 2: return n

    prev2 = 1
    prev1 = 2

    for i from 3 to n:
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr

    return prev1`,
        note: "dp[i] = dp[i-1] + dp[i-2]. You can take 1 or 2 steps, so this is identical to Fibonacci. Space-optimized to O(1) by only tracking the last two values.",
      },
      {
        type: 'bullets',
        heading: 'Framework for solving DP',
        items: [
          '1. Define the subproblem: what does dp[i] (or dp[i][j]) represent?',
          '2. Write the recurrence relation: how does dp[i] depend on smaller inputs?',
          '3. Identify base cases',
          '4. Decide: top-down (easier to write) or bottom-up (often more space-efficient)',
        ],
      },
    ],
    quiz: [
      {
        question: 'What are the two required properties for dynamic programming to apply?',
        options: [
          'Sorted input and unique elements',
          'Optimal substructure and overlapping subproblems',
          'Greedy choice property and a polynomial time bound',
          'A graph structure and a defined start node',
        ],
        answer: 1,
        explanation: 'Optimal substructure means the optimal solution to a problem contains optimal solutions to its subproblems. Overlapping subproblems means the same subproblems are solved repeatedly — which is why caching their results saves work.',
      },
      {
        question: 'In the Climbing Stairs solution, what does dp[i] represent?',
        options: [
          'The number of steps taken so far',
          'The number of distinct ways to reach step i',
          'The minimum cost to reach step i',
          'Whether step i has been visited',
        ],
        answer: 1,
        explanation: 'dp[i] is the number of distinct ways to climb to step i. Since you can take 1 or 2 steps, dp[i] = dp[i-1] + dp[i-2] — the same recurrence as Fibonacci.',
      },
      {
        question: 'What is the difference between top-down and bottom-up DP?',
        options: [
          'Top-down uses iteration; bottom-up uses recursion',
          'Top-down uses recursion with a cache; bottom-up fills a table iteratively',
          'Top-down is always faster; bottom-up uses less memory',
          'They are identical — just different names for the same approach',
        ],
        answer: 1,
        explanation: 'Top-down (memoization) starts from the original problem, recurses into subproblems, and caches results. Bottom-up (tabulation) starts from the smallest subproblems and builds up to the answer iteratively.',
      },
      {
        question: 'The Climbing Stairs solution tracks only two variables instead of a full dp[] array. What is the benefit?',
        options: [
          'It makes the code faster by avoiding array indexing',
          'It reduces space complexity from O(n) to O(1)',
          'It allows the solution to handle negative inputs',
          'It avoids integer overflow',
        ],
        answer: 1,
        explanation: 'Since dp[i] only depends on dp[i-1] and dp[i-2], you only need to keep the last two values. This reduces space from O(n) to O(1) without changing time complexity.',
      },
      {
        question: 'Which of these is the strongest signal that a problem should use DP?',
        options: [
          'The input is a sorted array',
          'The problem asks for the shortest path in a graph',
          'A brute force recursive solution recomputes the same subproblems many times',
          'The problem involves choosing between two options at each step',
        ],
        answer: 2,
        explanation: 'Repeated subproblems in a naive recursive solution is the clearest DP signal — you can add memoization directly to that recursion. Choosing between options at each step can hint at DP, but the overlap of subproblems is what makes caching worthwhile.',
      },
    ],
  },

  {
    id: 'linked-lists',
    title: 'Linked Lists',
    category: 'coding-problems',
    level: 'intermediate',
    languages: null,
    estimatedMinutes: 25,
    summary: 'Master pointer manipulation to reverse, detect cycles, and merge linked lists.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Linked list problems test pointer manipulation. Unlike arrays, you cannot index directly — you must traverse. Common patterns include using a dummy head node to simplify edge cases, fast/slow pointers for cycle detection, and reversing in-place.',
      },
      {
        type: 'code',
        heading: 'Reverse a linked list',
        language: 'pseudocode',
        snippet: `function reverseList(head):
    prev = null
    curr = head

    while curr != null:
        next = curr.next    // save next
        curr.next = prev    // reverse pointer
        prev = curr         // advance prev
        curr = next         // advance curr

    return prev   // new head`,
        note: 'Three pointers: prev, curr, next. Always save next before overwriting curr.next.',
      },
      {
        type: 'bullets',
        heading: 'Key patterns',
        items: [
          'Dummy head: add a dummy node before head to handle edge cases uniformly',
          'Fast/slow pointer: detect cycles, find middle, find kth from end',
          'Reverse: iterative (3-pointer) is cleaner than recursive for interviews',
          'Merge two sorted lists: compare heads, build merged list with pointers',
        ],
      },
    ],
    quiz: [
      {
        question: 'After reversing a linked list iteratively, which pointer holds the new head?',
        options: ['curr', 'next', 'prev', 'head'],
        answer: 2,
        explanation: 'When the loop ends, curr is null and prev points to the last node processed — which is the new head of the reversed list.',
      },
      {
        question: 'Why is saving `next = curr.next` the first step in the reversal loop?',
        options: [
          'To keep a reference to the rest of the list before overwriting curr.next',
          'To advance curr forward before updating prev',
          'To avoid modifying the original list',
          'To check if we have reached the end of the list',
        ],
        answer: 0,
        explanation: 'Once you set curr.next = prev, the link to the rest of the list is lost. Saving next first ensures you can still advance curr after reversing the pointer.',
      },
      {
        question: 'What problem is the fast/slow pointer pattern classically used to detect?',
        options: [
          'Finding the minimum value in a linked list',
          'Detecting a cycle in a linked list',
          'Reversing a linked list in-place',
          'Merging two sorted linked lists',
        ],
        answer: 1,
        explanation: "Floyd's cycle detection: move slow by 1 and fast by 2 each step. If there's a cycle, fast will eventually lap slow and they'll meet. If fast reaches null, there's no cycle.",
      },
      {
        question: 'What is the purpose of a dummy head node?',
        options: [
          'To store the length of the list',
          'To make the list circular',
          'To simplify edge cases by giving every real node a predecessor',
          'To speed up traversal with two pointers',
        ],
        answer: 2,
        explanation: 'A dummy head sits before the real head so every node (including the first) has a prev pointer. This removes special-case logic for operations on the head node, like deletion or insertion at the front.',
      },
      {
        question: 'To find the middle node of a linked list in one pass, you should:',
        options: [
          'Count all nodes, then traverse to count/2',
          'Use fast/slow pointers — when fast reaches the end, slow is at the middle',
          'Convert the list to an array and index the middle',
          'Use BFS starting from the head',
        ],
        answer: 1,
        explanation: 'Fast moves 2 nodes per step, slow moves 1. When fast reaches the end (or null), slow has covered half the distance — it sits at the middle. This is O(n) time and O(1) space.',
      },
    ],
  },

  {
    id: 'graphs',
    title: 'Graph Traversal',
    category: 'coding-problems',
    level: 'advanced',
    languages: null,
    estimatedMinutes: 35,
    summary: 'Apply BFS and DFS to graphs for shortest paths, connected components, and cycle detection.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Graphs generalize trees — nodes can have multiple parents, cycles, and disconnected components. Most graph problems use BFS (shortest path in unweighted graphs) or DFS (connected components, cycle detection, topological sort). Always maintain a visited set to avoid infinite loops.',
      },
      {
        type: 'code',
        heading: 'BFS for shortest path',
        language: 'pseudocode',
        snippet: `function shortestPath(graph, src, dst):
    visited = {src}
    queue = [src]
    steps = 0

    while queue is not empty:
        size = length(queue)
        repeat size times:
            node = queue.dequeue()
            if node == dst: return steps
            for each neighbor of graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.enqueue(neighbor)
        steps++

    return -1   // no path found`,
        note: 'BFS guarantees the shortest path in an unweighted graph. Mark nodes visited when enqueued, not when dequeued, to avoid processing duplicates.',
      },
      {
        type: 'bullets',
        heading: 'Common graph problems',
        items: [
          'Number of islands — DFS/BFS on a grid, treat cells as graph nodes',
          'Course schedule — cycle detection via DFS (topological sort)',
          'Clone graph — DFS with a HashMap to track cloned nodes',
          "Dijkstra's algorithm — shortest path in weighted graph (use a priority queue)",
        ],
      },
    ],
  },

  // ─── C# LANGUAGE FUNDAMENTALS ────────────────────────────────────────────────

  {
    id: 'csharp-value-reference-types',
    title: 'Value vs Reference Types',
    category: 'language-fundamentals',
    level: 'beginner',
    languages: ['csharp'],
    estimatedMinutes: 15,
    summary: 'Value types live on the stack and copy on assignment; reference types live on the heap and share identity.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'In C#, every type is either a value type or a reference type. Value types (int, double, bool, struct, enum) store their data directly — when you assign or pass them, a copy is made. Reference types (class, interface, array, delegate) store a reference to the heap — multiple variables can point to the same object.',
      },
      {
        type: 'code',
        heading: 'The difference in practice',
        language: 'csharp',
        snippet: `// Value type — copy on assignment
int a = 5;
int b = a;
b = 10;
Console.WriteLine(a); // 5 — unchanged

// Reference type — shared reference
var list1 = new List<int> { 1, 2, 3 };
var list2 = list1;
list2.Add(4);
Console.WriteLine(list1.Count); // 4 — list1 was mutated!

// Struct (value type)
struct Point { public int X, Y; }
Point p1 = new Point { X = 1, Y = 2 };
Point p2 = p1;
p2.X = 99;
Console.WriteLine(p1.X); // 1 — unchanged`,
        note: 'Structs are value types even though they look like classes. Use structs for small, immutable data (coordinates, colors). Use classes for entities with identity and behavior.',
      },
      {
        type: 'bullets',
        heading: 'Interview relevance',
        items: [
          'Explains why passing an array to a method mutates the original (reference type)',
          "Why int parameters don't change outside a method unless you use ref/out",
          'Boxing/unboxing: converting value type to object (reference) has a performance cost',
          'string is a reference type but behaves like a value type due to immutability',
        ],
      },
    ],
    quiz: [
      {
        question: 'What happens when you assign a struct value to a new variable in C#?',
        options: [
          'Both variables point to the same object on the heap',
          'A copy is made — changing one does not affect the other',
          'The original is moved and the first variable becomes null',
          'A reference to the original is stored',
        ],
        answer: 1,
        explanation: 'Structs are value types. Assignment copies all the data into a new location. Mutating the copy leaves the original unchanged.',
      },
      {
        question: 'Which of these is a value type in C#?',
        options: ['string', 'class instance', 'array', 'struct'],
        answer: 3,
        explanation: 'Structs are value types — they store data directly and copy on assignment. Classes, arrays, and strings are reference types (though string behaves immutably).',
      },
      {
        question: 'Why does passing a List<int> to a method and adding to it affect the caller\'s list?',
        options: [
          'Because List<T> implements ICloneable automatically',
          'Because List<T> is a reference type — both variables point to the same object',
          'Because C# always passes arguments by reference',
          'Because List<T> uses value semantics by default',
        ],
        answer: 1,
        explanation: 'List<T> is a class (reference type). Passing it to a method passes a copy of the reference, not a copy of the data. Both the caller and the method share the same underlying list.',
      },
      {
        question: 'What is boxing in C#?',
        options: [
          'Converting a reference type to a value type',
          'Converting a value type to an object reference',
          'Copying a struct to the heap manually',
          'Wrapping a class in an interface',
        ],
        answer: 1,
        explanation: 'Boxing wraps a value type (e.g., int) in a heap-allocated object so it can be treated as object. It has a performance cost — avoid it in hot paths by using generics instead.',
      },
      {
        question: 'Although string is a reference type, it behaves like a value type because:',
        options: [
          'Strings are allocated on the stack',
          'Strings are immutable — any "modification" creates a new string object',
          'The compiler inlines string values at compile time',
          'Strings implement a special copy interface',
        ],
        answer: 1,
        explanation: 'Every string operation that appears to modify a string actually returns a new string. Because strings never change in-place, two variables pointing to the same string can never surprise each other.',
      },
    ],
  },

  {
    id: 'csharp-collections',
    title: 'Collections: List<T> & Dictionary<K,V>',
    category: 'language-fundamentals',
    level: 'beginner',
    languages: ['csharp'],
    estimatedMinutes: 20,
    summary: 'The two most important C# collections for interviews — dynamic arrays and hash maps.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'C# has a rich generic collections library. For coding interviews, List<T> (dynamic array) and Dictionary<K,V> (hash map) handle 90% of cases. Understanding their performance characteristics is essential.',
      },
      {
        type: 'code',
        heading: 'List<T> essentials',
        language: 'csharp',
        snippet: `var nums = new List<int> { 3, 1, 4, 1, 5 };
nums.Add(9);             // O(1) amortized
nums.Insert(0, 99);      // O(n) — shifts elements
nums.Remove(1);          // O(n) — removes first occurrence
nums.RemoveAt(2);        // O(n) — removes at index
nums.Contains(4);        // O(n) — linear scan
nums.Count;              // O(1)
nums.Sort();             // O(n log n)
nums[0];                 // O(1) — index access`,
        note: 'List<T> is backed by an array that doubles when full. Random access is O(1). Use LinkedList<T> only when you need O(1) insertions at arbitrary positions.',
      },
      {
        type: 'code',
        heading: 'Dictionary<K,V> essentials',
        language: 'csharp',
        snippet: `var freq = new Dictionary<char, int>();

// Safe increment pattern (very common in interviews)
foreach (char c in "hello world") {
    freq[c] = freq.GetValueOrDefault(c, 0) + 1;
}

// Lookup patterns
freq.TryGetValue('l', out int count); // safe get
freq.ContainsKey('z');                // existence check
freq.Keys;                            // all keys
freq.Values;                          // all values
freq.Remove('h');`,
        note: 'GetValueOrDefault(key, 0) + 1 is the standard frequency-map pattern — no need to check if the key exists first.',
      },
      {
        type: 'bullets',
        heading: 'Other collections worth knowing',
        items: [
          'HashSet<T>: unique elements, O(1) add/contains — great for deduplication',
          'Stack<T>: LIFO — use for DFS, balanced parentheses, monotonic stack',
          'Queue<T>: FIFO — use for BFS',
          'SortedDictionary<K,V>: keys always sorted, O(log n) ops',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the time complexity of accessing an element by index in List<T>?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        answer: 2,
        explanation: 'List<T> is backed by an array, so index access is O(1) — a direct memory offset calculation. This is one of its main advantages over LinkedList<T>.',
      },
      {
        question: 'What is the standard C# pattern to increment a count in a Dictionary?',
        options: [
          'dict[key]++',
          'dict.Add(key, dict[key] + 1)',
          'dict[key] = dict.GetValueOrDefault(key, 0) + 1',
          'dict.Increment(key)',
        ],
        answer: 2,
        explanation: 'GetValueOrDefault(key, 0) returns 0 if the key is absent, so the pattern works whether the key exists or not — no ContainsKey check required.',
      },
      {
        question: 'Which collection keeps its keys in sorted order at all times?',
        options: ['Dictionary<K,V>', 'List<T>', 'SortedDictionary<K,V>', 'HashSet<T>'],
        answer: 2,
        explanation: 'SortedDictionary<K,V> is backed by a red-black tree and maintains keys in sorted order with O(log n) operations. Dictionary<K,V> uses a hash table and has no ordering guarantee.',
      },
      {
        question: 'What is the time complexity of List<T>.Insert(0, value)?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        answer: 2,
        explanation: 'Inserting at index 0 shifts every existing element one position right — O(n). Use a LinkedList<T> or Queue<T> if you frequently need O(1) insertions at the front.',
      },
      {
        question: 'Which collection is best for storing unique items and checking membership in O(1)?',
        options: ['List<T>', 'Dictionary<T, bool>', 'HashSet<T>', 'Queue<T>'],
        answer: 2,
        explanation: 'HashSet<T> is purpose-built for unique membership — O(1) add and contains using a hash table. Dictionary<T, bool> achieves the same but wastes memory on the redundant bool values.',
      },
    ],
  },

  {
    id: 'csharp-oop',
    title: 'OOP: Classes, Interfaces & Abstract Classes',
    category: 'language-fundamentals',
    level: 'beginner',
    languages: ['csharp'],
    estimatedMinutes: 25,
    summary: 'The building blocks of C# object-oriented design — know when to use each.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: "C# is a class-based, strongly-typed OOP language. The four pillars are encapsulation, inheritance, polymorphism, and abstraction. Interviews often test your ability to choose between concrete classes, abstract classes, and interfaces.",
      },
      {
        type: 'bullets',
        heading: 'Interface vs Abstract class',
        items: [
          'Interface: defines a contract (what a type can do), no state, multiple inheritance allowed',
          'Abstract class: partial implementation, can have fields/constructors, single inheritance only',
          'Use interface when unrelated classes share behavior (IDisposable, IEnumerable)',
          'Use abstract class when related classes share implementation and state',
        ],
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'csharp',
        snippet: `// Interface — defines capability
public interface IAnimal {
    string Name { get; }
    void MakeSound();
}

// Abstract class — shared base implementation
public abstract class Animal : IAnimal {
    public string Name { get; protected set; }
    public abstract void MakeSound(); // subclasses must override
    public void Sleep() => Console.WriteLine($"{Name} is sleeping.");
}

public class Dog : Animal {
    public Dog(string name) { Name = name; }
    public override void MakeSound() => Console.WriteLine("Woof!");
}`,
        note: "Abstract classes are 'is-a' relationships. Interfaces are 'can-do' relationships. A Dog IS an Animal; it CAN BE IDisposable.",
      },
      {
        type: 'bullets',
        heading: 'Key access modifiers',
        items: [
          'public: accessible everywhere',
          'private: accessible only within the class (default for members)',
          'protected: accessible within class and subclasses',
          'internal: accessible within the same assembly (project)',
        ],
      },
    ],
    quiz: [
      {
        question: 'How many interfaces can a single C# class implement?',
        options: ['Only one', 'Up to two', 'Any number', 'Only as many as it has abstract methods'],
        answer: 2,
        explanation: 'C# supports multiple interface implementation. A class can implement any number of interfaces simultaneously, which is the main way to achieve multiple-inheritance-like behavior.',
      },
      {
        question: 'What is the key difference between an abstract class and an interface?',
        options: [
          'Abstract classes support generics; interfaces do not',
          'Abstract classes can have fields and constructors; interfaces cannot',
          'Interfaces can have method implementations; abstract classes cannot',
          'A class can implement multiple abstract classes but only one interface',
        ],
        answer: 1,
        explanation: 'Abstract classes can hold state (fields) and initialization logic (constructors). Interfaces define a contract with no instance state. Note: C# 8+ allows default method bodies in interfaces, but still no instance fields.',
      },
      {
        question: 'Which access modifier makes a member visible only within its own class?',
        options: ['protected', 'internal', 'private', 'public'],
        answer: 2,
        explanation: 'private restricts access to the declaring class only. protected extends that to subclasses. internal extends it to the same assembly. public removes all restrictions.',
      },
      {
        question: 'When would you choose an interface over an abstract class?',
        options: [
          'When related classes need to share a base implementation',
          'When you need to store shared state across subclasses',
          'When unrelated classes need to share a capability (e.g., IDisposable)',
          'When you only want one class to implement the contract',
        ],
        answer: 2,
        explanation: 'Interfaces define what a type CAN DO. Use them when unrelated classes need to share a behavior contract. Use abstract classes when you have related types that share implementation and IS-A identity.',
      },
      {
        question: 'In the example, `Dog IS an Animal` and Dog CAN BE IDisposable. What relationship does each describe?',
        options: [
          'Both describe inheritance',
          'Both describe interface implementation',
          'IS-A is inheritance; CAN-DO is interface implementation',
          'IS-A is interface implementation; CAN-DO is inheritance',
        ],
        answer: 2,
        explanation: 'IS-A (inheritance) means Dog shares identity and implementation with Animal. CAN-DO (interface) means Dog is capable of a behavior but shares no implementation with other types that implement the same interface.',
      },
    ],
  },

  {
    id: 'csharp-linq',
    title: 'LINQ',
    category: 'language-fundamentals',
    level: 'intermediate',
    languages: ['csharp'],
    estimatedMinutes: 25,
    summary: 'Query and transform collections with concise, readable, declarative syntax.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: "LINQ (Language Integrated Query) lets you filter, sort, group, and transform collections using fluent method syntax. Interviewers love seeing LINQ — it shows C# fluency. LINQ is lazy (deferred execution) until you call a terminal operator like ToList() or Count().",
      },
      {
        type: 'code',
        heading: 'Essential LINQ operators',
        language: 'csharp',
        snippet: `var nums = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Filter
var evens = nums.Where(n => n % 2 == 0);

// Transform
var squares = nums.Select(n => n * n);

// Chain
var result = nums
    .Where(n => n > 3)
    .Select(n => n * 2)
    .Take(3)
    .ToList(); // [8, 10, 12]

// Aggregates
int sum = nums.Sum();
int max = nums.Max();
bool any = nums.Any(n => n > 5);
bool all = nums.All(n => n > 0);
int count = nums.Count(n => n % 2 == 0);

// Grouping
var grouped = nums.GroupBy(n => n % 2 == 0 ? "even" : "odd");`,
        note: 'LINQ is lazy — the query runs when you iterate or call ToList()/ToArray(). You can chain operators without executing until needed.',
      },
      {
        type: 'bullets',
        heading: 'Most useful for interviews',
        items: [
          'GroupBy + ToDictionary — build frequency maps concisely',
          'OrderBy / OrderByDescending — sort with a key selector',
          'SelectMany — flatten nested collections',
          'Distinct() — deduplicate',
          'Zip() — combine two sequences element-by-element',
        ],
      },
    ],
    quiz: [
      {
        question: 'What does LINQ stand for?',
        options: [
          'Language Integrated Query',
          'Logical Index Query',
          'List Iteration Query',
          'Lambda Interface Query',
        ],
        answer: 0,
        explanation: 'LINQ stands for Language Integrated Query — it lets you write query expressions directly in C# code against any IEnumerable source.',
      },
      {
        question: 'What does "deferred execution" mean in LINQ?',
        options: [
          'The query runs immediately when defined',
          'The query runs when you iterate or call a terminal operator like ToList()',
          'The query runs asynchronously in the background',
          'The query caches results for reuse',
        ],
        answer: 1,
        explanation: 'LINQ queries are lazy — they describe what to do but do nothing until you iterate the result or call a terminal operator (ToList, Count, First, etc.).',
      },
      {
        question: 'Which LINQ operator flattens a collection of collections into a single sequence?',
        options: ['Select', 'Aggregate', 'SelectMany', 'Flatten'],
        answer: 2,
        explanation: 'SelectMany projects each element to a sequence and merges all resulting sequences into one. Use it when each item contains a nested list you want to combine.',
      },
      {
        question: 'What is the result of `new[] {1,2,3,4,5}.Where(n => n > 3).Count()`?',
        options: ['1', '2', '3', '4'],
        answer: 1,
        explanation: 'Where(n => n > 3) filters to [4, 5] — two elements. Count() then returns 2.',
      },
      {
        question: 'Which LINQ method should you use to deduplicate a sequence?',
        options: ['Where', 'First', 'Distinct', 'Take'],
        answer: 2,
        explanation: 'Distinct() returns each unique element once, in first-seen order. It uses the default equality comparer unless you pass a custom one.',
      },
    ],
  },

  {
    id: 'csharp-async-await',
    title: 'Async/Await & Task',
    category: 'language-fundamentals',
    level: 'intermediate',
    languages: ['csharp'],
    estimatedMinutes: 25,
    summary: "Write non-blocking code that stays readable using C#'s async/await model.",
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: "C#'s async/await model lets you write asynchronous code that looks synchronous. The async keyword marks a method as asynchronous. The await keyword suspends execution until the awaited Task completes — without blocking the thread. This is essential for I/O-bound operations like database calls and HTTP requests.",
      },
      {
        type: 'code',
        heading: 'Basic pattern',
        language: 'csharp',
        snippet: `// Wrong — blocks the thread, risk of deadlock
public string GetData() {
    return httpClient.GetStringAsync(url).Result; // DEADLOCK risk
}

// Correct
public async Task<string> GetDataAsync() {
    return await httpClient.GetStringAsync(url);
}

// Run multiple tasks concurrently
public async Task RunBothAsync() {
    var task1 = GetDataAsync();
    var task2 = GetOtherDataAsync();
    await Task.WhenAll(task1, task2); // both run in parallel
}`,
        note: "Never use .Result or .Wait() on a Task in async contexts — it can deadlock. Always await.",
      },
      {
        type: 'bullets',
        heading: 'Key rules',
        items: [
          'async methods should return Task or Task<T>, not void (except event handlers)',
          'await can only be used inside an async method',
          '"async all the way" — async propagates up the call chain',
          'Task.WhenAll runs tasks concurrently; Task.WhenAny returns when the first completes',
          'Use CancellationToken for cancellable long-running operations',
        ],
      },
    ],
    quiz: [
      {
        question: 'What should an async method return when it produces a value?',
        options: ['void', 'Task', 'Task<T>', 'IAsyncResult'],
        answer: 2,
        explanation: 'An async method that returns a value should return Task<T>. Use Task (no generic) when no value is returned, and avoid async void except for event handlers.',
      },
      {
        question: 'What is the risk of calling `.Result` on a Task inside an async context?',
        options: [
          'It does not compile',
          'It can cause a deadlock',
          'It returns the wrong type',
          'It throws a NullReferenceException',
        ],
        answer: 1,
        explanation: '.Result blocks the current thread waiting for the Task. If the Task needs the same thread to complete (common in ASP.NET or UI contexts), the result is a deadlock. Always use await instead.',
      },
      {
        question: 'Which method runs multiple tasks concurrently and waits for ALL to complete?',
        options: ['Task.WhenAny', 'Task.WhenAll', 'Task.Run', 'Task.Delay'],
        answer: 1,
        explanation: 'Task.WhenAll returns a Task that completes when every supplied Task has finished. Task.WhenAny returns as soon as the first Task completes.',
      },
      {
        question: 'What does `await` do when it encounters an incomplete Task?',
        options: [
          'Blocks the current thread until done',
          'Throws an exception',
          'Suspends the method and releases the thread back to the caller',
          'Runs the task synchronously on a new thread',
        ],
        answer: 2,
        explanation: 'await suspends the current async method at that point, returns control to the caller, and schedules a continuation to resume when the Task completes — without blocking any thread.',
      },
      {
        question: 'When is `async void` an acceptable return type?',
        options: [
          'Service layer methods',
          'Repository queries',
          'Event handlers',
          'Controller actions',
        ],
        answer: 2,
        explanation: 'async void is acceptable only for event handlers because the event system cannot await a Task. In all other cases use async Task so callers can await and observe exceptions.',
      },
    ],
  },

  {
    id: 'csharp-generics',
    title: 'Generics',
    category: 'language-fundamentals',
    level: 'intermediate',
    languages: ['csharp'],
    estimatedMinutes: 20,
    summary: 'Write type-safe, reusable code without sacrificing performance using C# generics.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Generics let you write classes and methods that work with any type while maintaining compile-time type safety. They eliminate the need for boxing/unboxing and runtime casts. The entire C# collections library (List<T>, Dictionary<K,V>, etc.) is built on generics.',
      },
      {
        type: 'code',
        heading: 'Generic class and method',
        language: 'csharp',
        snippet: `// Generic class
public class Pair<T, U> {
    public T First { get; }
    public U Second { get; }
    public Pair(T first, U second) { First = first; Second = second; }
}

var p = new Pair<string, int>("age", 25);

// Generic method with constraint
public T Max<T>(T a, T b) where T : IComparable<T> {
    return a.CompareTo(b) >= 0 ? a : b;
}

int bigger = Max(3, 7);       // 7
string later = Max("a", "z"); // "z"`,
        note: "The 'where T : IComparable<T>' constraint tells the compiler T supports comparison. Without it, you can't call CompareTo.",
      },
      {
        type: 'bullets',
        heading: 'Common constraints',
        items: [
          'where T : class — T must be a reference type',
          'where T : struct — T must be a value type',
          'where T : new() — T must have a parameterless constructor',
          'where T : ISomeInterface — T must implement the interface',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the main advantage of generics over using `object`?',
        options: [
          'More concise syntax',
          'Compile-time type safety without boxing or casting',
          'Support for more data types',
          'Smaller compiled output',
        ],
        answer: 1,
        explanation: 'Generics preserve type information at compile time. Using object requires casting and causes boxing for value types — generics eliminate both at no runtime cost.',
      },
      {
        question: 'Which constraint requires T to have a parameterless constructor?',
        options: [
          'where T : class',
          'where T : struct',
          'where T : new()',
          'where T : IConstructable',
        ],
        answer: 2,
        explanation: 'where T : new() lets you call `new T()` inside the generic method or class. Without this constraint the compiler cannot guarantee T has a parameterless constructor.',
      },
      {
        question: 'What does `where T : IComparable<T>` allow you to do inside the generic method?',
        options: [
          'Cast T to int',
          'Compare T to any object',
          'Call T\'s CompareTo method',
          'Use T in LINQ queries',
        ],
        answer: 2,
        explanation: 'The constraint tells the compiler that T implements IComparable<T>, so you can safely call a.CompareTo(b) on values of type T within the method.',
      },
      {
        question: 'Which of these C# collections is NOT generic?',
        options: ['List<T>', 'Dictionary<K,V>', 'ArrayList', 'HashSet<T>'],
        answer: 2,
        explanation: 'ArrayList is from the pre-generics era — it stores elements as object and requires casting. The modern equivalent is List<T>.',
      },
      {
        question: 'Can a single generic type have more than two type parameters?',
        options: [
          'No, the maximum is one',
          'No, the maximum is two',
          'Yes, any number of type parameters is allowed',
          'Only if they are all the same underlying type',
        ],
        answer: 2,
        explanation: 'C# generics support any number of type parameters. For example, Action<T1,T2,T3,...> goes up to 16 parameters in the BCL, and you can define your own with as many as needed.',
      },
    ],
  },

  // ─── TYPESCRIPT LANGUAGE FUNDAMENTALS ────────────────────────────────────────

  {
    id: 'ts-types',
    title: 'Types & Type Inference',
    category: 'language-fundamentals',
    level: 'beginner',
    languages: ['typescript'],
    estimatedMinutes: 15,
    summary: 'TypeScript adds static types to JavaScript — the compiler catches errors before runtime.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'TypeScript is a superset of JavaScript that adds optional static typing. Type annotations let you declare what kind of value a variable holds. Type inference means the compiler often figures out the type automatically — you only need to annotate when inference falls short.',
      },
      {
        type: 'code',
        heading: 'Basic types',
        language: 'typescript',
        snippet: `// Explicit annotations
let name: string = 'Alice'
let age: number = 30
let active: boolean = true

// Type inference — no annotation needed
let city = 'London'      // inferred as string
let count = 0            // inferred as number

// Arrays
let scores: number[] = [95, 87, 73]
let tags: string[] = ['ts', 'node']

// Tuple — fixed length, known types at each position
let point: [number, number] = [1, 2]

// any disables type checking — avoid it
let data: any = fetchRawData()

// unknown is safer — forces you to narrow before using
let input: unknown = getUserInput()
if (typeof input === 'string') console.log(input.toUpperCase())`,
        note: 'Prefer unknown over any. unknown forces you to check the type before using the value; any skips all checks silently.',
      },
      {
        type: 'bullets',
        heading: 'Types to know for interviews',
        items: [
          'string, number, boolean — the three primitives',
          'null and undefined — distinct types; use strictNullChecks to catch misuse',
          'void — return type for functions that return nothing',
          'never — a function that never returns (throws or infinite loops)',
          'object — non-primitive; rarely used directly, prefer an interface',
        ],
      },
    ],
    quiz: [
      {
        question: 'What does type inference mean in TypeScript?',
        options: [
          'Types are checked only at runtime',
          'The compiler deduces the type from the assigned value without an explicit annotation',
          'All variables must be annotated manually',
          'Types are inferred from function return values only',
        ],
        answer: 1,
        explanation: 'When you write `let x = 5`, TypeScript infers x as number from the initializer. You only need an explicit annotation when inference cannot determine the correct type.',
      },
      {
        question: 'What is the key difference between `any` and `unknown`?',
        options: [
          'any is for primitives; unknown is for objects',
          'unknown requires a type check before you can use the value; any skips all checks',
          'They are interchangeable — just different names',
          'any is safer because it accepts more types',
        ],
        answer: 1,
        explanation: 'unknown forces you to narrow the type (e.g., with typeof or instanceof) before calling methods on it. any bypasses the type system entirely, hiding potential runtime errors.',
      },
      {
        question: 'What does `let point: [number, number]` declare?',
        options: [
          'An array of any length containing numbers',
          'An object with two number fields',
          'A tuple — an array with exactly two numbers at fixed positions',
          'A union type of number and number',
        ],
        answer: 2,
        explanation: 'Tuple types enforce both the length and the type at each index. [number, number] means exactly two numbers — point[0] and point[1] are both number.',
      },
      {
        question: 'What is the `never` type used for?',
        options: [
          'A function that returns undefined',
          'A variable that has not been assigned yet',
          'A function that never returns — it always throws or runs infinitely',
          'An empty array type',
        ],
        answer: 2,
        explanation: 'never represents the type of values that never occur. Common uses: functions that always throw an error, or exhaustive switch cases where TypeScript can prove a branch is unreachable.',
      },
      {
        question: 'Which annotation should you prefer when you do not know the type of an external value?',
        options: ['any', 'object', 'unknown', 'void'],
        answer: 2,
        explanation: 'unknown is the type-safe alternative to any. It tells TypeScript "I do not know the type yet" while still requiring you to narrow it before use, preventing silent runtime errors.',
      },
    ],
  },

  {
    id: 'ts-interfaces',
    title: 'Interfaces & Type Aliases',
    category: 'language-fundamentals',
    level: 'beginner',
    languages: ['typescript'],
    estimatedMinutes: 15,
    summary: 'Define the shape of objects with interfaces and type aliases — the foundation of TypeScript design.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Interfaces and type aliases both describe the shape of an object. Interfaces are best for defining contracts that classes can implement or that other interfaces can extend. Type aliases are more flexible — they can name any type, including unions, tuples, and primitives.',
      },
      {
        type: 'code',
        heading: 'Interface vs type alias',
        language: 'typescript',
        snippet: `// Interface
interface User {
  id: number
  name: string
  email?: string   // optional property
  readonly createdAt: Date  // cannot be reassigned
}

// Type alias — equivalent for objects
type Point = {
  x: number
  y: number
}

// Only type aliases can describe unions
type ID = string | number
type Status = 'active' | 'inactive' | 'pending'

// Extending interfaces
interface Admin extends User {
  role: string
}

// Intersection with types
type AdminUser = User & { role: string }`,
        note: 'Prefer interface for public APIs and class contracts. Use type for unions, intersections, or when you need to alias a primitive or tuple.',
      },
      {
        type: 'bullets',
        heading: 'Key differences',
        items: [
          'Interfaces can be extended with extends; types use & (intersection)',
          'Interfaces support declaration merging — define the same interface twice to combine them',
          'Type aliases can describe any type; interfaces can only describe objects and functions',
          'For interview purposes: both work for object shapes — pick one and be consistent',
        ],
      },
    ],
    quiz: [
      {
        question: 'What does the `?` after a property name in an interface mean?',
        options: [
          'The property is read-only',
          'The property is optional — it may or may not be present',
          'The property can be null',
          'The property type is unknown',
        ],
        answer: 1,
        explanation: 'A trailing ? marks the property as optional. The object satisfies the interface whether or not that property is included.',
      },
      {
        question: 'Which of these can ONLY be expressed with a type alias, not an interface?',
        options: [
          'An object with two string properties',
          'A union type like `string | number`',
          'An interface that extends another interface',
          'A readonly property',
        ],
        answer: 1,
        explanation: 'Interfaces can only describe object shapes and function signatures. Union types (A | B), intersections used as standalone aliases, and primitive aliases require type.',
      },
      {
        question: 'What is declaration merging?',
        options: [
          'Combining two type aliases into one',
          'Declaring the same interface name twice — TypeScript merges the two definitions',
          'Using & to combine two interfaces',
          'Extending an interface with additional properties',
        ],
        answer: 1,
        explanation: 'If you declare the same interface name in two places, TypeScript merges them into one. This is unique to interfaces — type aliases do not support this and will throw a duplicate identifier error.',
      },
      {
        question: 'How do you make a property in an interface immutable after assignment?',
        options: [
          'Mark it with `const`',
          'Mark it with `readonly`',
          'Mark it with `final`',
          'Mark it with `immutable`',
        ],
        answer: 1,
        explanation: 'readonly prevents reassignment of that property after the object is created. It is a compile-time check only — it does not affect the runtime object.',
      },
      {
        question: 'What is the TypeScript equivalent of extending an interface using a type alias?',
        options: [
          'type Admin = User extends { role: string }',
          'type Admin = User & { role: string }',
          'type Admin = User | { role: string }',
          'type Admin = User implements { role: string }',
        ],
        answer: 1,
        explanation: 'The & intersection operator combines all properties from both types into one. The resulting type requires every property from User AND the additional role property.',
      },
    ],
  },

  {
    id: 'ts-functions',
    title: 'Functions',
    category: 'language-fundamentals',
    level: 'beginner',
    languages: ['typescript'],
    estimatedMinutes: 15,
    summary: 'Type your function parameters and return values to catch errors at compile time.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'TypeScript lets you annotate function parameters and return types. This prevents passing the wrong argument type and ensures callers handle the return value correctly. Optional parameters, default values, and rest parameters all have typed equivalents.',
      },
      {
        type: 'code',
        heading: 'Typed functions',
        language: 'typescript',
        snippet: `// Parameter and return type annotations
function add(a: number, b: number): number {
  return a + b
}

// Optional parameter with ?
function greet(name: string, greeting?: string): string {
  return \`\${greeting ?? 'Hello'}, \${name}!\`
}

// Default parameter
function repeat(str: string, times: number = 2): string {
  return str.repeat(times)
}

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0)
}

// Function type as a parameter (callback)
function transform(values: number[], fn: (n: number) => number): number[] {
  return values.map(fn)
}

// Arrow function with type annotation
const double = (n: number): number => n * 2`,
        note: 'If a function never returns a value, annotate it as : void. If it always throws, use : never.',
      },
      {
        type: 'bullets',
        heading: 'Interview tips',
        items: [
          'Always annotate function signatures in TypeScript interviews — it shows intentionality',
          'Use (param?: Type) for optional params; it is safer than passing undefined explicitly',
          'Prefer explicit return type annotations on public functions for documentation clarity',
          'Function overloads: declare multiple signatures, then one implementation signature',
        ],
      },
    ],
    quiz: [
      {
        question: 'What does `greeting?: string` mean in a function parameter?',
        options: [
          'greeting must be a string or null',
          'greeting is optional — it can be omitted by the caller',
          'greeting defaults to an empty string',
          'greeting is read-only inside the function',
        ],
        answer: 1,
        explanation: 'The ? makes the parameter optional. The caller can omit it entirely. Inside the function, its type is string | undefined, so you must handle the undefined case.',
      },
      {
        question: 'What is the correct TypeScript type for a callback that takes a number and returns a string?',
        options: [
          'function(number): string',
          '(n: number) => string',
          'callback<number, string>',
          'Function<number, string>',
        ],
        answer: 1,
        explanation: 'Arrow function syntax is the standard way to type callbacks and function-typed parameters: (paramName: ParamType) => ReturnType.',
      },
      {
        question: 'What return type should you use for a function that performs a side effect and returns nothing?',
        options: ['undefined', 'null', 'void', 'never'],
        answer: 2,
        explanation: 'void indicates the function\'s return value is not meaningful and should not be used. It is different from never — void functions return normally, never functions do not return at all.',
      },
      {
        question: 'Given `function sum(...nums: number[])`, what type is `nums` inside the function?',
        options: ['number', 'number | undefined', 'number[]', 'readonly number[]'],
        answer: 2,
        explanation: 'Rest parameters collect all extra arguments into an array. Inside the function body, nums is a number[] and you can use all array methods on it.',
      },
      {
        question: 'What does a default parameter value do to the required/optional status of that parameter?',
        options: [
          'Nothing — you must still pass the argument',
          'Makes the parameter optional — callers can omit it',
          'Makes the parameter readonly',
          'Changes the type to include undefined',
        ],
        answer: 1,
        explanation: 'A parameter with a default value is implicitly optional. If the caller omits it, the default is used. Unlike ?, the type inside the function is just the base type (not | undefined) because the default covers the missing case.',
      },
    ],
  },

  {
    id: 'ts-generics',
    title: 'Generics',
    category: 'language-fundamentals',
    level: 'intermediate',
    languages: ['typescript'],
    estimatedMinutes: 20,
    summary: 'Write reusable, type-safe functions and components that work across multiple types.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Generics let you write functions and types that work with any type while preserving type information. Without generics you would have to use any and lose all type safety. The type parameter acts as a placeholder filled in at call time.',
      },
      {
        type: 'code',
        heading: 'Generic functions and constraints',
        language: 'typescript',
        snippet: `// Without generics — loses type info
function first(arr: any[]): any {
  return arr[0]
}

// With generics — type is preserved
function first<T>(arr: T[]): T {
  return arr[0]
}

const num = first([1, 2, 3])      // inferred as number
const str = first(['a', 'b'])     // inferred as string

// Constraint — T must have a .length property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}

// Generic interface
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

const res: ApiResponse<User> = await fetchUser(1)
res.data.name  // typed as User`,
        note: 'Use extends to constrain what types T can be. Without constraints, TypeScript only knows T is "some type" and will not allow you to access any properties on it.',
      },
      {
        type: 'bullets',
        heading: 'Common patterns',
        items: [
          'T extends keyof U — constrain T to be a key of object type U',
          'Partial<T> — makes all properties of T optional',
          'Required<T> — makes all properties required',
          'Pick<T, K> — pick a subset of properties from T',
          'Record<K, V> — object type with keys K and values V',
        ],
      },
    ],
    quiz: [
      {
        question: 'What problem do generics solve compared to using `any`?',
        options: [
          'Generics run faster at runtime',
          'Generics preserve type information so TypeScript can catch errors at compile time',
          'Generics allow more types to be used',
          'Generics remove the need for type annotations',
        ],
        answer: 1,
        explanation: 'any silently discards type information. Generics keep the type relationship — if you pass a number[] to first<T>, TypeScript knows the return value is number, not any.',
      },
      {
        question: 'What does `T extends { length: number }` mean as a constraint?',
        options: [
          'T must be a subclass of an object',
          'T must have a length property of type number',
          'T must be a number',
          'T must extend the built-in Length class',
        ],
        answer: 1,
        explanation: 'extends in a generic constraint means "T must be assignable to this shape." It does not have to be a class — any type that has a compatible length: number property satisfies it (string, array, etc.).',
      },
      {
        question: 'When you call `first([1, 2, 3])` with `function first<T>(arr: T[]): T`, what is T inferred as?',
        options: ['any', 'unknown', 'number', 'number[]'],
        answer: 2,
        explanation: 'TypeScript infers T from the argument. Since you passed a number[], T is inferred as number, and the return type is number.',
      },
      {
        question: 'What does the built-in `Partial<T>` utility type do?',
        options: [
          'Removes all properties from T',
          'Makes all properties of T optional',
          'Makes all properties of T readonly',
          'Picks a subset of properties from T',
        ],
        answer: 1,
        explanation: 'Partial<T> transforms every property in T to be optional (?). Useful for update functions where you only want to pass the fields being changed.',
      },
      {
        question: 'What does `Record<string, number>` represent?',
        options: [
          'A tuple of string and number',
          'An object where keys are strings and values are numbers',
          'A Map with string keys',
          'A union of string and number',
        ],
        answer: 1,
        explanation: 'Record<K, V> is shorthand for an object type where all keys are of type K and all values are of type V. Record<string, number> is equivalent to { [key: string]: number }.',
      },
    ],
  },

  {
    id: 'ts-union-intersection',
    title: 'Union & Intersection Types',
    category: 'language-fundamentals',
    level: 'intermediate',
    languages: ['typescript'],
    estimatedMinutes: 20,
    summary: 'Combine types with | and & to model real-world data that takes multiple shapes.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Union types (A | B) mean a value can be one of several types. Intersection types (A & B) mean a value must satisfy all types simultaneously. Narrowing is how you tell TypeScript which branch of a union you are in so you can access type-specific properties safely.',
      },
      {
        type: 'code',
        heading: 'Unions, narrowing, and discriminated unions',
        language: 'typescript',
        snippet: `// Union type
type ID = string | number

function printId(id: ID) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())  // TypeScript knows it's string here
  } else {
    console.log(id.toFixed(2))     // and number here
  }
}

// Discriminated union — a shared literal field acts as a tag
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2
    case 'rect':   return shape.width * shape.height
  }
}

// Intersection — must satisfy both
type Admin = User & { role: string; permissions: string[] }`,
        note: 'Discriminated unions are the most powerful pattern — a shared literal field (kind, type, tag) lets TypeScript narrow automatically in switch statements.',
      },
      {
        type: 'bullets',
        heading: 'Narrowing techniques',
        items: [
          'typeof — narrows primitives (string, number, boolean)',
          'instanceof — narrows class instances',
          '"property" in obj — narrows by property presence',
          'Discriminant field — switch on a shared literal property',
          'Type predicates: function isUser(x): x is User — custom narrowing functions',
        ],
      },
    ],
    quiz: [
      {
        question: 'What does `string | number` mean as a type?',
        options: [
          'The value must be both a string and a number',
          'The value can be either a string or a number',
          'The value is a string that contains a number',
          'The value must be converted between string and number',
        ],
        answer: 1,
        explanation: 'The | operator creates a union — the value can be any one of the listed types. TypeScript requires you to narrow before accessing type-specific methods.',
      },
      {
        question: 'What is type narrowing?',
        options: [
          'Removing properties from a type',
          'Checking the type at runtime so TypeScript knows the specific type in that branch',
          'Converting a wide type to a more specific one permanently',
          'Casting a type with the as keyword',
        ],
        answer: 1,
        explanation: 'Narrowing is when a runtime check (typeof, instanceof, etc.) tells TypeScript that within a specific code branch, the type is more specific. TypeScript uses control flow analysis to track this.',
      },
      {
        question: 'What makes a discriminated union work?',
        options: [
          'All members must have the same properties',
          'A shared property with a unique literal value on each member acts as a tag',
          'The union must have exactly two members',
          'Each member must be a class, not an object type',
        ],
        answer: 1,
        explanation: 'The shared literal field (e.g., kind: \'circle\' vs kind: \'rect\') lets TypeScript automatically narrow the union when you check that field — no manual type assertions needed.',
      },
      {
        question: 'What does the intersection type `A & B` require?',
        options: [
          'The value can be either A or B',
          'The value must satisfy all properties of both A and B',
          'A and B must be identical types',
          'A must extend B',
        ],
        answer: 1,
        explanation: '& creates a type that has every property from all intersected types. It is often used to combine an existing type with additional properties without using extends.',
      },
      {
        question: 'Which narrowing technique should you use to distinguish between two different class instances?',
        options: ['typeof', 'instanceof', '"property" in obj', 'Discriminant field'],
        answer: 1,
        explanation: 'instanceof checks whether an object was created by a specific constructor function. typeof only distinguishes primitives (string, number, boolean, etc.).',
      },
    ],
  },

  {
    id: 'ts-async',
    title: 'Async/Await & Promises',
    category: 'language-fundamentals',
    level: 'intermediate',
    languages: ['typescript'],
    estimatedMinutes: 20,
    summary: 'Type your asynchronous code with Promise<T> and async/await for safe, readable async TypeScript.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'TypeScript fully supports async/await with typed Promises. An async function always returns Promise<T> where T is the type of the resolved value. Proper typing of async code catches errors like forgetting to await and mishandling resolved values.',
      },
      {
        type: 'code',
        heading: 'Typed async functions',
        language: 'typescript',
        snippet: `// Return type is Promise<User>
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  if (!res.ok) throw new Error('Not found')
  return res.json() as Promise<User>
}

// Error handling
async function safeLoad(id: number): Promise<User | null> {
  try {
    return await fetchUser(id)
  } catch {
    return null
  }
}

// Run multiple requests concurrently
async function loadDashboard(userId: number) {
  const [user, posts] = await Promise.all([
    fetchUser(userId),          // Promise<User>
    fetchPosts(userId),         // Promise<Post[]>
  ])
  return { user, posts }
}

// Promise.allSettled — doesn't short-circuit on failure
const results = await Promise.allSettled([fetchA(), fetchB()])
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value)
  else console.error(r.reason)
})`,
        note: 'Promise.all rejects if any promise rejects. Use Promise.allSettled when you want all results regardless of individual failures.',
      },
      {
        type: 'bullets',
        heading: 'TypeScript-specific tips',
        items: [
          'An async function returning string has inferred type Promise<string> — no annotation needed',
          'Use res.json() as Promise<User> to cast untyped fetch responses',
          'Avoid async void — prefer async (): Promise<void> so errors can be caught',
          'Type errors in Promise chains show up at compile time with proper generics',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the return type of `async function fetchUser(): Promise<User>`?',
        options: ['User', 'Promise<User>', 'async<User>', 'Task<User>'],
        answer: 1,
        explanation: 'An async function always returns a Promise. The type parameter T in Promise<T> is the type of the value the Promise resolves to — in this case User.',
      },
      {
        question: 'What is the difference between Promise.all and Promise.allSettled?',
        options: [
          'Promise.all is faster; Promise.allSettled is more accurate',
          'Promise.all rejects if any promise rejects; Promise.allSettled waits for all and returns each outcome',
          'Promise.allSettled only works with typed promises',
          'They are identical in behavior',
        ],
        answer: 1,
        explanation: 'Promise.all short-circuits — one rejection rejects the whole thing. Promise.allSettled waits for every promise and gives you a result object with status: "fulfilled" or "rejected" for each.',
      },
      {
        question: 'Why should you avoid `async void` as a return type in TypeScript?',
        options: [
          'It causes a compile error',
          'Errors thrown inside an async void function cannot be caught by the caller',
          'It makes the function synchronous',
          'void is not a valid Promise type',
        ],
        answer: 1,
        explanation: 'async void functions return a Promise<void> but the caller has no reference to it, so unhandled rejections become silent. Use Promise<void> so callers can await and catch errors.',
      },
      {
        question: 'When you write `const [user, posts] = await Promise.all([fetchUser(), fetchPosts()])`, what happens?',
        options: [
          'fetchUser runs, then fetchPosts runs sequentially',
          'Both requests start concurrently and both must complete before continuing',
          'The faster request resolves first and the code continues',
          'TypeScript infers the tuple types from the Promise array',
        ],
        answer: 1,
        explanation: 'Promise.all starts all promises concurrently. Execution continues only when all have resolved. This is more efficient than awaiting each one sequentially.',
      },
      {
        question: 'How do you cast an untyped `fetch` JSON response to a known type?',
        options: [
          'const user: User = await res.json()',
          'const user = res.json() as User',
          'const user = (User) res.json()',
          'const user = res.json<User>()',
        ],
        answer: 0,
        explanation: 'Both options A and B work in TypeScript, but `const user: User = await res.json()` is the idiomatic form — it annotates the variable rather than using a type assertion cast, which is slightly safer.',
      },
    ],
  },

  // ─── PYTHON LANGUAGE FUNDAMENTALS ────────────────────────────────────────────

  {
    id: 'py-data-structures',
    title: 'Lists, Dicts & Sets',
    category: 'language-fundamentals',
    level: 'beginner',
    languages: ['python'],
    estimatedMinutes: 20,
    summary: 'Python\'s three workhorse collections — master their operations and time complexities.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Python\'s built-in collections handle the majority of interview problems. Lists are ordered dynamic arrays, dicts are hash maps, and sets are hash sets. Knowing their performance characteristics and idiomatic usage is essential.',
      },
      {
        type: 'code',
        heading: 'Lists',
        language: 'python',
        snippet: `nums = [3, 1, 4, 1, 5, 9]

nums.append(2)          # O(1) — add to end
nums.insert(0, 99)      # O(n) — shifts elements
nums.pop()              # O(1) — remove last
nums.pop(0)             # O(n) — remove at index
nums.remove(1)          # O(n) — remove first occurrence of value
nums.sort()             # O(n log n) — in-place
sorted(nums)            # O(n log n) — returns new list
nums[2]                 # O(1) — index access
nums[-1]                # O(1) — last element
nums[1:4]               # O(k) — slicing`,
        note: 'Use collections.deque for O(1) appends and pops from both ends — list.insert(0, x) and list.pop(0) are O(n).',
      },
      {
        type: 'code',
        heading: 'Dicts & Sets',
        language: 'python',
        snippet: `# Dict — hash map
freq = {}
for ch in "hello":
    freq[ch] = freq.get(ch, 0) + 1   # safe increment

# defaultdict avoids the get() pattern
from collections import defaultdict
freq = defaultdict(int)
for ch in "hello":
    freq[ch] += 1

# Common dict operations
d = {'a': 1, 'b': 2}
d.get('z', 0)        # safe get with default
'a' in d             # O(1) key check
d.items()            # key-value pairs
d.keys(), d.values()

# Set — hash set, O(1) add/contains
seen = set()
seen.add(5)
5 in seen            # O(1)
seen.discard(5)      # remove if present, no error if absent`,
        note: 'defaultdict(int) and Counter from collections are the fastest ways to build frequency maps in interview code.',
      },
    ],
    quiz: [
      {
        question: 'What is the time complexity of `list.pop(0)` in Python?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        answer: 2,
        explanation: 'Removing from the front of a list shifts every remaining element left — O(n). Use collections.deque for O(1) pops from both ends.',
      },
      {
        question: 'What does `freq.get(ch, 0)` do when `ch` is not in the dictionary?',
        options: [
          'Raises a KeyError',
          'Returns None',
          'Returns 0 — the default value provided',
          'Inserts ch with value 0',
        ],
        answer: 2,
        explanation: 'dict.get(key, default) returns the default if the key is absent, without modifying the dict. It is the safe alternative to dict[key] which raises KeyError.',
      },
      {
        question: 'What is the average time complexity of checking membership (`x in s`) for a set?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        answer: 2,
        explanation: 'Sets use a hash table. Membership testing is O(1) on average — the same as a dict key lookup. This is why sets are preferred over lists for deduplication and existence checks.',
      },
      {
        question: 'Which collection should you use for O(1) appends and pops from BOTH ends?',
        options: ['list', 'collections.deque', 'heapq', 'set'],
        answer: 1,
        explanation: 'collections.deque is a doubly-ended queue with O(1) appendleft/popleft AND append/pop. list only has O(1) operations at the right end.',
      },
      {
        question: 'What does `defaultdict(int)` do differently from a regular dict?',
        options: [
          'It only accepts integer keys',
          'It automatically initializes missing keys with the default value of the given type (0 for int)',
          'It sorts keys as integers',
          'It raises a different error when a key is missing',
        ],
        answer: 1,
        explanation: 'defaultdict calls the provided factory function to create a default value for any missing key. defaultdict(int) initializes missing keys to 0, eliminating the need for .get(key, 0) checks.',
      },
    ],
  },

  {
    id: 'py-functions',
    title: 'Functions & Scope',
    category: 'language-fundamentals',
    level: 'beginner',
    languages: ['python'],
    estimatedMinutes: 15,
    summary: 'Master Python\'s flexible function signatures — args, kwargs, defaults, and closures.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Python functions support positional arguments, keyword arguments, default values, *args (variable positional), and **kwargs (variable keyword). Understanding their order and behavior is essential for writing clean, interview-ready Python.',
      },
      {
        type: 'code',
        heading: 'Function signatures',
        language: 'python',
        snippet: `# Default parameter
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Alice")              # "Hello, Alice!"
greet("Bob", "Hi")          # "Hi, Bob!"
greet("Carol", greeting="Hey")  # keyword arg

# *args — variable positional arguments (tuple)
def add(*nums):
    return sum(nums)

add(1, 2, 3, 4)  # 10

# **kwargs — variable keyword arguments (dict)
def config(**options):
    for key, value in options.items():
        print(f"{key} = {value}")

config(debug=True, timeout=30)

# Full signature order: positional, *args, keyword-only, **kwargs
def full(a, b, *args, sep=",", **kwargs):
    pass

# Lambda — anonymous one-liner
square = lambda x: x ** 2
nums.sort(key=lambda x: -x)  # sort descending`,
        note: 'Default mutable arguments are a classic Python gotcha: def f(lst=[]) shares the same list across all calls. Use def f(lst=None): lst = lst or [] instead.',
      },
      {
        type: 'bullets',
        heading: 'Closures & scope (LEGB)',
        items: [
          'Python resolves names in order: Local → Enclosing → Global → Built-in',
          'A closure is a function that captures variables from its enclosing scope',
          'Use nonlocal to assign to an enclosing scope variable (not global)',
          'Use global to assign to a module-level variable from inside a function',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the classic Python gotcha with mutable default arguments?',
        options: [
          'They raise a TypeError at definition time',
          'The same mutable object is shared across all calls where the default is used',
          'They cannot be overridden by the caller',
          'They are copied on each function call, wasting memory',
        ],
        answer: 1,
        explanation: 'Default argument values are evaluated once when the function is defined. If the default is mutable (a list or dict), all calls that use the default share the same object, causing surprising state accumulation.',
      },
      {
        question: 'In `def f(a, b, *args, **kwargs)`, what type is `args` inside the function?',
        options: ['list', 'tuple', 'dict', 'set'],
        answer: 1,
        explanation: '*args collects extra positional arguments into a tuple, not a list. **kwargs collects extra keyword arguments into a dict.',
      },
      {
        question: 'What does the `nonlocal` keyword do?',
        options: [
          'Declares a variable as module-level',
          'Allows a nested function to assign to a variable in its enclosing (non-global) scope',
          'Prevents a variable from being modified',
          'Creates a copy of an outer variable inside the nested function',
        ],
        answer: 1,
        explanation: 'Without nonlocal, assigning to a name in a nested function creates a new local variable. nonlocal tells Python to look up the enclosing scope and modify the variable there.',
      },
      {
        question: 'What does `nums.sort(key=lambda x: -x)` do?',
        options: [
          'Sorts nums ascending',
          'Sorts nums descending by negating each value as the sort key',
          'Sorts nums by absolute value',
          'Raises an error — sort does not accept a lambda',
        ],
        answer: 1,
        explanation: 'The key function transforms each element for comparison. Using -x reverses the natural ordering, producing a descending sort. Equivalent to nums.sort(reverse=True).',
      },
      {
        question: 'What is Python\'s LEGB rule?',
        options: [
          'The order in which Python evaluates boolean expressions',
          'The order Python searches for a variable name: Local, Enclosing, Global, Built-in',
          'The order of execution for function arguments',
          'The precedence of lambda, expression, global, and block scopes',
        ],
        answer: 1,
        explanation: 'When Python encounters a name, it searches scopes in LEGB order. If not found in Local, it checks the Enclosing function scope, then the Global (module) scope, then Built-ins like len and range.',
      },
    ],
  },

  {
    id: 'py-classes',
    title: 'Classes & OOP',
    category: 'language-fundamentals',
    level: 'beginner',
    languages: ['python'],
    estimatedMinutes: 20,
    summary: 'Define classes, use inheritance, and leverage Python\'s dunder methods for idiomatic OOP.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Python is a multi-paradigm language but supports full object-oriented programming. Classes use __init__ for initialization, self for instance references, and special "dunder" (double underscore) methods to integrate with Python\'s built-in operations.',
      },
      {
        type: 'code',
        heading: 'Class basics',
        language: 'python',
        snippet: `class Animal:
    # Class variable — shared by all instances
    count = 0

    def __init__(self, name: str):
        self.name = name       # instance variable
        Animal.count += 1

    def speak(self) -> str:
        raise NotImplementedError

    def __repr__(self) -> str:
        return f"Animal({self.name!r})"

    def __eq__(self, other) -> bool:
        return isinstance(other, Animal) and self.name == other.name


class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name)  # call parent __init__
        self.breed = breed

    def speak(self) -> str:
        return "Woof!"


dog = Dog("Rex", "Lab")
print(dog.speak())       # Woof!
print(repr(dog))         # Animal('Rex')
print(Dog.count)         # 1`,
        note: 'Always call super().__init__() in a subclass __init__ to ensure the parent class is initialized correctly.',
      },
      {
        type: 'bullets',
        heading: 'Dunder methods to know',
        items: [
          '__init__: constructor — initializes a new instance',
          '__repr__: unambiguous string for debugging — used by repr() and in the REPL',
          '__str__: human-readable string — used by print() and str()',
          '__len__: makes len(obj) work',
          '__eq__ / __lt__: equality and comparison — needed for sorting or using in sets/dicts',
          '@property: define a getter as an attribute (no parentheses on access)',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the purpose of `self` in a Python class method?',
        options: [
          'It is a keyword that refers to the class itself',
          'It is a convention for the first parameter — it refers to the instance the method is called on',
          'It is required for static methods',
          'It automatically calls the parent class method',
        ],
        answer: 1,
        explanation: 'self is just a naming convention for the first parameter of instance methods. Python automatically passes the instance as the first argument when you call obj.method(), binding self to that instance.',
      },
      {
        question: 'What is the difference between a class variable and an instance variable?',
        options: [
          'Class variables are private; instance variables are public',
          'Class variables are shared across all instances; instance variables are unique per instance',
          'Instance variables are defined in __init__; class variables cannot be modified',
          'They are identical — just defined in different places',
        ],
        answer: 1,
        explanation: 'A class variable (defined directly on the class) is shared by every instance. An instance variable (set via self.x = ...) belongs to that specific object and does not affect others.',
      },
      {
        question: 'What does `super().__init__(name)` do in a subclass?',
        options: [
          'Creates a new instance of the parent class',
          'Calls the parent class\'s __init__ to initialize inherited state',
          'Overrides the parent __init__ entirely',
          'Copies all parent attributes to the subclass',
        ],
        answer: 1,
        explanation: 'super() returns a proxy to the parent class. Calling super().__init__() ensures the parent\'s initialization logic runs, setting up any attributes the parent defines before the subclass adds its own.',
      },
      {
        question: 'Which dunder method should you implement to make `print(obj)` show a human-readable description?',
        options: ['__repr__', '__str__', '__format__', '__display__'],
        answer: 1,
        explanation: '__str__ is called by str() and print(). __repr__ is for unambiguous developer output (used in the REPL and repr()). If only __repr__ is defined, it is used as a fallback for str() too.',
      },
      {
        question: 'What does the `@property` decorator do?',
        options: [
          'Makes the method a class method instead of an instance method',
          'Allows a method to be accessed like an attribute (without parentheses)',
          'Prevents the attribute from being modified',
          'Makes the attribute available on the class, not instances',
        ],
        answer: 1,
        explanation: '@property lets you define a getter that is called with attribute syntax (obj.name) instead of method syntax (obj.name()). This is useful for computed properties and controlled access.',
      },
    ],
  },

  {
    id: 'py-comprehensions',
    title: 'Comprehensions & Generators',
    category: 'language-fundamentals',
    level: 'intermediate',
    languages: ['python'],
    estimatedMinutes: 20,
    summary: 'Write concise, Pythonic transformations with list/dict comprehensions and memory-efficient generators.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Comprehensions are concise, readable expressions for building collections. Generators produce values lazily — one at a time — making them memory-efficient for large sequences. Both are heavily tested in Python interviews as markers of language fluency.',
      },
      {
        type: 'code',
        heading: 'Comprehensions',
        language: 'python',
        snippet: `nums = [1, 2, 3, 4, 5, 6]

# List comprehension
squares = [x ** 2 for x in nums]               # [1, 4, 9, 16, 25, 36]
evens   = [x for x in nums if x % 2 == 0]      # [2, 4, 6]

# Dict comprehension
word_len = {w: len(w) for w in ["hi", "hello"]} # {'hi': 2, 'hello': 5}

# Set comprehension
unique_mods = {x % 3 for x in nums}            # {0, 1, 2}

# Nested comprehension (flatten a 2D list)
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [n for row in matrix for n in row]       # [1, 2, 3, 4, 5, 6]`,
        note: 'Read nested comprehensions left to right: "for row in matrix" is the outer loop, "for n in row" is the inner loop — the same order as nested for loops.',
      },
      {
        type: 'code',
        heading: 'Generators',
        language: 'python',
        snippet: `# Generator expression — like list comp but lazy (uses parentheses)
gen = (x ** 2 for x in range(1_000_000))  # no memory allocated yet
next(gen)   # 0, computed on demand

# Generator function with yield
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print([next(fib) for _ in range(8)])  # [0, 1, 1, 2, 3, 5, 8, 13]

# Using generators with built-ins
total = sum(x ** 2 for x in range(1000))  # no intermediate list`,
        note: 'A generator function pauses at each yield, preserving its state. Calling next() resumes from where it left off.',
      },
    ],
    quiz: [
      {
        question: 'What is the difference between `[x**2 for x in nums]` and `(x**2 for x in nums)`?',
        options: [
          'The parenthesized version creates a tuple',
          'The parenthesized version creates a generator — values are computed lazily on demand',
          'They are identical — just different syntax for the same result',
          'The list version is always faster',
        ],
        answer: 1,
        explanation: 'Square brackets create a list (all values computed immediately). Parentheses create a generator expression (values computed one at a time when iterated). Generators use far less memory for large sequences.',
      },
      {
        question: 'What does the `yield` keyword do in a generator function?',
        options: [
          'Returns a value and terminates the function',
          'Pauses the function and produces a value; resumes from that point on the next call to next()',
          'Creates a new generator object each time it is reached',
          'Yields execution to another thread',
        ],
        answer: 1,
        explanation: 'yield suspends the function, returning the value to the caller. The function\'s local state (variables, position) is preserved. The next call to next() resumes execution from right after the yield.',
      },
      {
        question: 'What is the correct reading order for `[n for row in matrix for n in row]`?',
        options: [
          'Inner loop first: for n in row, then for row in matrix',
          'Left to right: outer loop is for row in matrix, inner loop is for n in row',
          'The order does not matter — Python optimizes it',
          'Right to left — same as math notation',
        ],
        answer: 1,
        explanation: 'Nested comprehensions read left to right, matching the order of nested for loops. The leftmost for is the outermost loop.',
      },
      {
        question: 'Why would you use a generator expression instead of a list comprehension?',
        options: [
          'Generators support filtering with if; list comprehensions do not',
          'Generators produce values lazily, using O(1) memory instead of O(n)',
          'Generators are always faster',
          'List comprehensions cannot be used with built-ins like sum()',
        ],
        answer: 1,
        explanation: 'A generator holds only one value in memory at a time. sum(x**2 for x in range(10**6)) computes the sum without ever materializing the full list — crucial for large datasets.',
      },
      {
        question: 'What does `{w: len(w) for w in words}` produce?',
        options: [
          'A set of (word, length) tuples',
          'A list of lengths',
          'A dict mapping each word to its length',
          'A generator of word-length pairs',
        ],
        answer: 2,
        explanation: 'The key: value syntax inside curly braces creates a dict comprehension. The result maps each word string to its integer length.',
      },
    ],
  },

  {
    id: 'py-decorators',
    title: 'Decorators',
    category: 'language-fundamentals',
    level: 'intermediate',
    languages: ['python'],
    estimatedMinutes: 20,
    summary: 'Wrap functions to add behavior — the pattern behind @property, @staticmethod, and custom decorators.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'A decorator is a function that takes another function and returns a modified version. The @syntax is shorthand for wrapping. Decorators are used throughout Python\'s standard library (@property, @staticmethod, @classmethod) and popular frameworks (Flask\'s @app.route, pytest\'s @pytest.fixture).',
      },
      {
        type: 'code',
        heading: 'Writing and using decorators',
        language: 'python',
        snippet: `import functools

# A simple decorator
def timer(func):
    @functools.wraps(func)   # preserves func's name and docstring
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.3f}s")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

slow_sum(10_000_000)   # prints: slow_sum took 0.312s

# Built-in class decorators
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def area(self):           # accessed as circle.area, no ()
        return 3.14159 * self._radius ** 2

    @staticmethod
    def unit():               # no self or cls — utility function on the class
        return Circle(1)

    @classmethod
    def from_diameter(cls, d):  # cls is the class itself, not an instance
        return cls(d / 2)`,
        note: '@functools.wraps preserves the original function\'s __name__ and __doc__. Without it, introspection tools see "wrapper" everywhere instead of the real function name.',
      },
      {
        type: 'bullets',
        heading: '@staticmethod vs @classmethod',
        items: [
          '@staticmethod: no implicit first argument — just a regular function namespaced to the class',
          '@classmethod: receives cls (the class itself) as the first argument — used for alternative constructors',
          '@property: turns a method into a read-only attribute; add @x.setter for a writable property',
          'Decorator stacking: decorators apply bottom-up — @b @a def f() means b(a(f))',
        ],
      },
    ],
    quiz: [
      {
        question: 'What does `@timer` above a function definition do?',
        options: [
          'Schedules the function to run after a delay',
          'Wraps the function — equivalent to `slow_sum = timer(slow_sum)`',
          'Adds a timer attribute to the function object',
          'Runs the function immediately when the module loads',
        ],
        answer: 1,
        explanation: '@decorator is syntactic sugar for func = decorator(func). The original function is replaced by whatever the decorator returns — usually a wrapper function.',
      },
      {
        question: 'Why should you use `@functools.wraps(func)` inside a decorator?',
        options: [
          'It makes the wrapper function faster',
          'It preserves the original function\'s __name__ and __doc__ on the wrapper',
          'It allows the decorator to accept arguments',
          'It prevents the decorator from being applied more than once',
        ],
        answer: 1,
        explanation: 'Without @functools.wraps, tools that inspect function names (debuggers, logging, help()) see "wrapper" instead of the original name. wraps copies the metadata from the wrapped function onto the wrapper.',
      },
      {
        question: 'What is the key difference between @staticmethod and @classmethod?',
        options: [
          '@staticmethod can modify class state; @classmethod cannot',
          '@classmethod receives the class (cls) as its first argument; @staticmethod receives no implicit argument',
          '@staticmethod is for public methods; @classmethod is for private methods',
          'They are identical — just different naming conventions',
        ],
        answer: 1,
        explanation: '@classmethod receives cls, making it useful for alternative constructors (cls(...) creates an instance of whatever class it is called on). @staticmethod is just a namespaced utility function with no access to the class or instance.',
      },
      {
        question: 'How do you access a @property in Python?',
        options: [
          'obj.area()',
          'obj.area — without parentheses, like an attribute',
          'obj.get_area()',
          'Circle.area(obj)',
        ],
        answer: 1,
        explanation: '@property makes the method look like a plain attribute to callers. Accessing obj.area invokes the getter function transparently — no parentheses needed.',
      },
      {
        question: 'If a function has `@b` on top and `@a` below it, in what order are the decorators applied?',
        options: [
          'Top to bottom: a first, then b',
          'Bottom to top: a first, then b wraps the result',
          'Both are applied simultaneously',
          'The order does not matter',
        ],
        answer: 1,
        explanation: 'Decorators are applied bottom-up. @b @a def f() means f = b(a(f)) — a wraps f first, then b wraps the result of that.',
      },
    ],
  },

  {
    id: 'py-async',
    title: 'Async/Await & asyncio',
    category: 'language-fundamentals',
    level: 'intermediate',
    languages: ['python'],
    estimatedMinutes: 20,
    summary: 'Write concurrent I/O-bound Python with asyncio\'s async/await model.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Python\'s asyncio library enables concurrent I/O without threads. async def defines a coroutine — a function that can be paused and resumed. await suspends the current coroutine until the awaited coroutine or Future completes, freeing the event loop to run other tasks.',
      },
      {
        type: 'code',
        heading: 'async/await basics',
        language: 'python',
        snippet: `import asyncio
import aiohttp

# Coroutine — must be awaited to run
async def fetch(session, url: str) -> str:
    async with session.get(url) as response:
        return await response.text()

# Run coroutines concurrently with asyncio.gather
async def main():
    urls = ["https://example.com/a", "https://example.com/b"]
    async with aiohttp.ClientSession() as session:
        results = await asyncio.gather(
            *[fetch(session, url) for url in urls]
        )
    return results

# Entry point — runs the event loop
asyncio.run(main())

# asyncio.gather vs asyncio.wait
# gather — returns results in order, raises on first error
# wait   — returns sets of done/pending tasks, more control`,
        note: 'asyncio is single-threaded — it switches between coroutines at each await, not between OS threads. Use it for I/O-bound work (network, files). For CPU-bound work, use multiprocessing.',
      },
      {
        type: 'bullets',
        heading: 'Key concepts',
        items: [
          'Coroutine: defined with async def — calling it returns a coroutine object, not the result',
          'Event loop: runs coroutines, managed by asyncio.run() at the top level',
          'await: yields control back to the event loop until the awaitable completes',
          'asyncio.gather: runs multiple coroutines concurrently and returns results in order',
          'asyncio.create_task: schedules a coroutine to run without waiting for it immediately',
        ],
      },
    ],
    quiz: [
      {
        question: 'What does calling an `async def` function return?',
        options: [
          'The function\'s return value immediately',
          'A coroutine object — it does not execute until awaited or scheduled',
          'A Future object',
          'A Thread object',
        ],
        answer: 1,
        explanation: 'Calling an async function does not run it. It returns a coroutine object. You must await it (inside another async function) or pass it to asyncio.run() to actually execute it.',
      },
      {
        question: 'What does `await` do when it encounters a coroutine?',
        options: [
          'Blocks the entire program until the coroutine completes',
          'Suspends the current coroutine and gives the event loop a chance to run other tasks',
          'Runs the coroutine in a new thread',
          'Converts the coroutine to a synchronous function',
        ],
        answer: 1,
        explanation: 'await pauses the current coroutine and returns control to the event loop, which can then run other ready coroutines. When the awaited task completes, the paused coroutine resumes.',
      },
      {
        question: 'When should you use asyncio instead of threads in Python?',
        options: [
          'For CPU-bound tasks like data processing',
          'For I/O-bound tasks like network requests and file reads',
          'Whenever you need true parallelism',
          'asyncio replaces threads in all cases',
        ],
        answer: 1,
        explanation: 'asyncio is ideal for I/O-bound work — while waiting for a network response, the event loop can process other coroutines. For CPU-bound work, use multiprocessing, since the GIL prevents true CPU parallelism with threads or asyncio.',
      },
      {
        question: 'What does `asyncio.gather(coro1, coro2, coro3)` do?',
        options: [
          'Runs each coroutine sequentially and returns a list of results',
          'Runs all coroutines concurrently and returns their results in the same order',
          'Returns whichever coroutine finishes first',
          'Creates three separate event loops',
        ],
        answer: 1,
        explanation: 'asyncio.gather schedules all provided coroutines to run concurrently on the same event loop and returns their results in the order the coroutines were passed, regardless of completion order.',
      },
      {
        question: 'What is the correct way to run an async function from synchronous code (the entry point)?',
        options: [
          'main()',
          'await main()',
          'asyncio.run(main())',
          'asyncio.start(main)',
        ],
        answer: 2,
        explanation: 'asyncio.run() creates a new event loop, runs the given coroutine until it completes, then closes the loop. It is the standard top-level entry point for asyncio programs.',
      },
    ],
  },

  // ─── BEHAVIORAL ──────────────────────────────────────────────────────────────

  {
    id: 'star-method',
    title: 'The STAR Method',
    category: 'behavioral',
    level: 'beginner',
    languages: null,
    estimatedMinutes: 15,
    summary: 'Structure every behavioral answer with Situation, Task, Action, Result for clarity and impact.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'The STAR method is the universal framework for answering behavioral interview questions ("Tell me about a time when..."). It ensures your answer is structured, specific, and shows your impact. Every behavioral answer should follow this format.',
      },
      {
        type: 'bullets',
        heading: 'The four parts',
        items: [
          'Situation: Set the scene. What was the context? (1–2 sentences)',
          'Task: What was your specific responsibility or challenge?',
          'Action: What did YOU do? Focus on your own actions, not "we". Be specific.',
          'Result: What was the outcome? Use numbers where possible. What did you learn?',
        ],
      },
      {
        type: 'paragraph',
        heading: 'Getting the ratio right',
        body: "The most common mistake is spending too long on Situation and not enough on Action. Aim for: 10% Situation, 10% Task, 60% Action, 20% Result. The interviewer wants to understand how you think and what you did — not just the background. Another mistake: saying 'we' instead of 'I'.",
      },
      {
        type: 'bullets',
        heading: 'Tips for strong answers',
        items: [
          'Prepare 5–6 versatile stories that can answer different question types',
          'Quantify results: "reduced build time by 40%" beats "made it faster"',
          'Choose stories where you drove the outcome, not just participated',
          'Practice out loud — written stories sound different when spoken',
          'Keep answers to 2–3 minutes max',
        ],
      },
    ],
    practiceQuestions: [
      'Tell me about a time you took ownership of a project or problem that wasn\'t going well.',
      'Describe a situation where you had to meet a tight deadline. How did you handle it?',
      'Tell me about a time you had to learn something new quickly to complete a task.',
      'Give an example of a time you showed initiative beyond what was asked of you.',
    ],
  },

  {
    id: 'tell-me-about-yourself',
    title: '"Tell Me About Yourself"',
    category: 'behavioral',
    level: 'beginner',
    languages: null,
    estimatedMinutes: 10,
    summary: 'Deliver a 2-minute professional narrative that sets the tone for the rest of the interview.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: '"Tell me about yourself" is almost always the first question. It\'s not an invitation to recite your resume — it\'s your opportunity to deliver a confident narrative that frames the conversation. A good answer lasts 90 seconds to 2 minutes and ends by connecting your background to why you\'re excited about this specific role.',
      },
      {
        type: 'bullets',
        heading: 'Recommended structure',
        items: [
          '1. Present: "I\'m currently a [role] at [company], where I focus on..."',
          '2. Past: "Before that, I [key experience that\'s relevant]..."',
          '3. Why here: "I\'m particularly excited about this role because..."',
        ],
      },
      {
        type: 'paragraph',
        heading: 'What to avoid',
        body: "Don't start with where you were born or summarize every job on your resume. Don't be vague ('I'm a hard worker who loves challenges'). Don't forget to connect your background to the role — this shows preparation. Don't go over 2 minutes.",
      },
      {
        type: 'bullets',
        heading: 'Preparation tips',
        items: [
          'Write it out, then practice until it sounds natural — not memorized',
          'Tailor the ending ("why here") for each company',
          'Have a version for technical audiences and one for HR',
          'Record yourself and watch it back once',
        ],
      },
    ],
    practiceQuestions: [
      'Tell me about yourself.',
      'Walk me through your background and what brought you to apply for this role.',
      'Tell me about your experience and what you\'re looking for in your next position.',
    ],
  },

  {
    id: 'strengths-weaknesses',
    title: 'Strengths & Weaknesses',
    category: 'behavioral',
    level: 'beginner',
    languages: null,
    estimatedMinutes: 10,
    summary: 'Give authentic, specific answers that show self-awareness and growth mindset.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Strengths',
        body: "Choose a strength genuinely relevant to the role and back it with a specific example. Avoid generic claims like 'I'm a hard worker.' Instead: 'My strongest skill is breaking down ambiguous problems — for example, when our team had a vague performance requirement, I defined measurable benchmarks and drove the investigation.' One well-supported strength beats three vague ones.",
      },
      {
        type: 'paragraph',
        heading: 'Weaknesses',
        body: "Interviewers aren't looking for a confessional — they're checking for self-awareness and growth mindset. Choose a real weakness that isn't a core job requirement. Describe what you've done to improve it. Example: 'I used to struggle with delegating. I've been working on this by proactively mentoring junior developers and measuring success by their output, not mine.'",
      },
      {
        type: 'bullets',
        heading: 'Traps to avoid',
        items: [
          '"My biggest weakness is I work too hard" — a cliché that insults the interviewer',
          'Choosing a weakness that is central to the job',
          'Describing a weakness with no improvement plan',
          'Giving more than one weakness unless asked',
        ],
      },
    ],
    practiceQuestions: [
      'What\'s your greatest weakness?',
      'What would your manager say is your biggest area for improvement?',
      'What\'s a strength you\'re known for? Can you give a specific example?',
      'How do you handle situations where someone on your team is stronger than you in an area?',
    ],
  },

  {
    id: 'conflict-resolution',
    title: 'Conflict Resolution',
    category: 'behavioral',
    level: 'intermediate',
    languages: null,
    estimatedMinutes: 15,
    summary: 'Show emotional maturity and collaboration skills when asked about disagreements at work.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: "Questions like 'Tell me about a time you disagreed with a coworker/manager' test emotional intelligence. Interviewers want to see that you can handle conflict constructively — communicate clearly, stay focused on outcomes rather than personalities, and reach resolution without damaging working relationships.",
      },
      {
        type: 'bullets',
        heading: 'What interviewers look for',
        items: [
          'You approached the conflict directly, not passive-aggressively',
          "You listened to understand the other person's perspective",
          'You focused on the best outcome for the team/product, not on winning',
          'The situation resolved positively (even if you didn\'t get your way)',
          'You maintained the working relationship afterward',
        ],
      },
      {
        type: 'bullets',
        heading: 'What to avoid',
        items: [
          "Saying you've never had a conflict (shows lack of self-awareness)",
          'Making the other person sound incompetent or unreasonable',
          'Focusing on who was "right" rather than how it was resolved',
          'Choosing a story where the conflict is still unresolved',
        ],
      },
    ],
    practiceQuestions: [
      'Tell me about a time you disagreed with a coworker or manager. How did you handle it?',
      'Describe a situation where you had to work with a difficult colleague.',
      'Tell me about a time you had to push back on a decision you thought was wrong.',
      'Have you ever had to deliver feedback that someone didn\'t want to hear? How did you approach it?',
    ],
  },

  {
    id: 'failure-learning',
    title: 'Failure & Learning',
    category: 'behavioral',
    level: 'intermediate',
    languages: null,
    estimatedMinutes: 10,
    summary: 'Demonstrate resilience and growth by owning a real failure and what you took from it.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: '"Tell me about a time you failed" tests honesty, self-awareness, and whether you\'ve internalized lessons. The best answers own the failure without excuses, explain the root cause, and show a concrete change in behavior afterward.',
      },
      {
        type: 'bullets',
        heading: 'Structure',
        items: [
          '1. What happened: be specific and direct. Own your role fully.',
          '2. Why it happened: root cause, not blame. What was your judgment error?',
          '3. Impact: acknowledge the real consequences honestly',
          '4. What you changed: a specific, behavioral change — not just "I was more careful"',
          '5. Optional: how the change played out positively later',
        ],
      },
      {
        type: 'bullets',
        heading: 'Choosing the right story',
        items: [
          'The failure should be real, not trivial',
          'Avoid failures that make you seem incompetent for the role',
          'The recovery and learning is the most important part — end on growth',
          "Don't blame teammates, tools, or circumstances — the question is about you",
        ],
      },
    ],
    practiceQuestions: [
      'Tell me about a time you failed. What happened and what did you learn from it?',
      'Describe a project that didn\'t go as planned. What would you do differently?',
      'Tell me about a mistake you made and how you handled it.',
      'What\'s the biggest professional mistake you\'ve made, and what did it teach you?',
    ],
  },

  // ─── SYSTEMS DESIGN ───────────────────────────────────────────────────────────

  {
    id: 'apis-rest',
    title: 'APIs & REST',
    category: 'systems-design',
    level: 'beginner',
    languages: null,
    estimatedMinutes: 20,
    summary: 'Understand how services communicate over HTTP using REST conventions.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'An API (Application Programming Interface) is a contract between services defining how they communicate. REST (Representational State Transfer) is the most common architectural style for web APIs. It uses HTTP methods on resources identified by URLs, with data exchanged as JSON.',
      },
      {
        type: 'bullets',
        heading: 'HTTP methods',
        items: [
          'GET: retrieve a resource — idempotent, no side effects',
          'POST: create a new resource — not idempotent',
          'PUT: replace a resource entirely — idempotent',
          'PATCH: partially update a resource',
          'DELETE: remove a resource — idempotent',
        ],
      },
      {
        type: 'bullets',
        heading: 'Status codes to know',
        items: [
          '200 OK, 201 Created, 204 No Content',
          '400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests',
          '500 Internal Server Error, 503 Service Unavailable',
        ],
      },
      {
        type: 'bullets',
        heading: 'REST best practices',
        items: [
          'Use nouns in URLs, not verbs: /users/123 not /getUser?id=123',
          'Version your API: /v1/users',
          'Use pagination for collections: /users?page=2&limit=20',
          'Return meaningful error messages in the response body',
        ],
      },
    ],
    quiz: [
      {
        question: 'Which HTTP method is used to create a new resource?',
        options: ['GET', 'PUT', 'POST', 'PATCH'],
        answer: 2,
        explanation: 'POST creates a new resource. PUT replaces an existing resource entirely. PATCH applies a partial update. GET retrieves without side effects.',
      },
      {
        question: 'What does "idempotent" mean for an HTTP method?',
        options: [
          'It can only be called once per session',
          'Calling it multiple times with the same input produces the same result',
          'It always returns the same status code',
          'It does not modify server state',
        ],
        answer: 1,
        explanation: 'GET, PUT, and DELETE are idempotent — repeating them has the same effect as calling them once. POST is not idempotent — calling it twice creates two resources.',
      },
      {
        question: 'What status code indicates a resource was successfully created?',
        options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
        answer: 1,
        explanation: '201 Created is returned when a POST successfully creates a new resource. The response often includes the new resource or a Location header pointing to it.',
      },
      {
        question: 'Which URL follows REST best practices?',
        options: ['/getUser?id=123', '/user/delete/123', '/users/123', '/fetchUserById/123'],
        answer: 2,
        explanation: 'REST uses nouns (resources) in URLs and relies on the HTTP method to express the action. /users/123 with DELETE deletes; with GET retrieves — the URL stays clean.',
      },
      {
        question: 'What is the difference between PUT and PATCH?',
        options: [
          'PUT creates a resource; PATCH updates it',
          'PUT replaces the entire resource; PATCH applies a partial update',
          'PUT is not idempotent; PATCH is',
          'They are interchangeable in REST',
        ],
        answer: 1,
        explanation: 'PUT replaces the full resource — omitted fields are removed. PATCH only updates the fields you send. Use PATCH when you want to change one field without resending the entire object.',
      },
    ],
  },

  {
    id: 'databases',
    title: 'Databases: SQL vs NoSQL',
    category: 'systems-design',
    level: 'beginner',
    languages: null,
    estimatedMinutes: 20,
    summary: 'Choose the right database for the job — relational for structured data, NoSQL for scale and flexibility.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Choosing the right database is one of the first decisions in system design. SQL (relational) databases store data in structured tables with predefined schemas and support ACID transactions. NoSQL databases trade some consistency guarantees for scalability, flexibility, and performance at scale.',
      },
      {
        type: 'bullets',
        heading: 'SQL (PostgreSQL, MySQL, SQL Server)',
        items: [
          'Structured schema with tables, rows, and columns',
          'ACID transactions: Atomicity, Consistency, Isolation, Durability',
          'Powerful querying with JOINs across tables',
          'Scales vertically — horizontal sharding is complex',
          'Best for: financial data, user accounts, anything requiring strong consistency',
        ],
      },
      {
        type: 'bullets',
        heading: 'NoSQL (MongoDB, DynamoDB, Cassandra)',
        items: [
          'Flexible schema — documents, key-value, wide-column, or graph',
          'Scales horizontally by design',
          'Eventual consistency (by default)',
          'Best for: user feeds, real-time data, IoT, content with varying shape',
          'Not ideal when you need complex queries across multiple entities',
        ],
      },
      {
        type: 'bullets',
        heading: 'Interview tips',
        items: [
          'Default to SQL unless you have a clear reason for NoSQL',
          'Know indexing: an index speeds up reads but slows writes and uses space',
          'Know the N+1 query problem: fetching a list, then querying each item individually',
        ],
      },
    ],
    quiz: [
      {
        question: 'What does ACID stand for in database transactions?',
        options: [
          'Arrays, Columns, Indexes, Data',
          'Atomicity, Consistency, Isolation, Durability',
          'Atomicity, Concurrency, Integrity, Durability',
          'Access, Control, Integrity, Design',
        ],
        answer: 1,
        explanation: 'ACID guarantees that transactions are all-or-nothing (Atomic), leave the DB in a valid state (Consistent), don\'t interfere with each other (Isolated), and survive crashes (Durable).',
      },
      {
        question: 'Which database type is better suited for complex JOINs across multiple related entities?',
        options: ['NoSQL document store', 'Key-value store', 'SQL (relational)', 'Wide-column store'],
        answer: 2,
        explanation: 'SQL databases are designed around normalized, relational data with foreign keys and JOIN operations. NoSQL stores generally lack multi-table JOINs and favor denormalized, document-oriented data.',
      },
      {
        question: 'What scaling approach do SQL databases favor?',
        options: ['Horizontal sharding by default', 'Vertical scaling', 'Eventual consistency', 'Replication-first'],
        answer: 1,
        explanation: 'SQL databases scale vertically (bigger machine) most naturally. Horizontal sharding is possible but complex because relational queries can span shard boundaries. NoSQL databases are designed to scale horizontally from the start.',
      },
      {
        question: 'What is the N+1 query problem?',
        options: [
          'Running the same query N times in a loop accidentally',
          'Fetching a list with one query, then making an additional query for each item',
          'Using N indexes on the same table',
          'A query that requires N JOIN operations',
        ],
        answer: 1,
        explanation: 'N+1 means 1 query to fetch a list of N items, then N individual queries to fetch related data for each item. Fix it with a JOIN or eager-loading to get all data in 1-2 queries.',
      },
      {
        question: 'In a system design interview, when should you default to a SQL database?',
        options: [
          'When you need to store unstructured documents',
          'When horizontal scaling at massive scale is the primary concern',
          'Unless you have a clear reason to use NoSQL',
          'Only when the entire dataset fits on one machine',
        ],
        answer: 2,
        explanation: 'SQL is the safe default — it\'s well-understood, ACID-compliant, and handles most use cases well. Choose NoSQL when you have specific reasons: extreme write throughput, flexible schemas, or global distribution requirements.',
      },
    ],
  },

  {
    id: 'caching',
    title: 'Caching Strategies',
    category: 'systems-design',
    level: 'intermediate',
    languages: null,
    estimatedMinutes: 20,
    summary: 'Store frequently accessed data in fast memory to reduce latency and database load.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Caching stores a copy of expensive-to-compute or frequently-read data in fast storage (memory) so future requests are served faster. Redis and Memcached are the standard in-memory cache solutions. The hard part is cache invalidation — knowing when to update or evict stale data.',
      },
      {
        type: 'bullets',
        heading: 'Cache patterns',
        items: [
          'Cache-aside (lazy loading): app checks cache first; on miss, reads from DB and populates cache',
          'Write-through: write to cache and DB simultaneously — cache is always fresh',
          'Write-behind: write to cache immediately, sync to DB asynchronously — risky on crash',
          'Read-through: cache handles the DB read automatically on a miss',
        ],
      },
      {
        type: 'bullets',
        heading: 'Eviction policies',
        items: [
          'LRU (Least Recently Used): evict the item not accessed for the longest time — most common',
          'LFU (Least Frequently Used): evict the item accessed least often',
          'TTL (Time To Live): evict after a fixed duration — simple, good for time-sensitive data',
        ],
      },
      {
        type: 'bullets',
        heading: 'Cache invalidation',
        items: [
          'Write-through solves staleness but doubles write latency',
          'TTL is simple but data can be stale up to TTL duration',
          'Event-driven invalidation: invalidate on specific DB changes — complex but precise',
          '"There are only two hard things in CS: cache invalidation and naming things" — Phil Karlton',
        ],
      },
    ],
  },

  {
    id: 'load-balancing',
    title: 'Load Balancing & Scaling',
    category: 'systems-design',
    level: 'intermediate',
    languages: null,
    estimatedMinutes: 25,
    summary: 'Distribute traffic across multiple servers to handle more load and avoid single points of failure.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'A load balancer distributes incoming requests across multiple servers. This provides horizontal scalability (add more servers) and high availability (if one server fails, others handle traffic). Load balancers operate at Layer 4 (TCP) or Layer 7 (HTTP — can route based on path or headers).',
      },
      {
        type: 'bullets',
        heading: 'Load balancing algorithms',
        items: [
          'Round Robin: each server gets a request in turn — works when servers are equal',
          'Weighted Round Robin: servers get requests proportional to their capacity',
          'Least Connections: route to the server with fewest active connections',
          'IP Hash: same client IP always goes to the same server (useful for sticky sessions)',
        ],
      },
      {
        type: 'bullets',
        heading: 'Horizontal vs Vertical scaling',
        items: [
          'Vertical (scale up): add more CPU/RAM to a single server — simple but has limits',
          'Horizontal (scale out): add more servers — requires stateless design or shared state',
          'Stateless services scale horizontally easily; stateful services need shared session storage (Redis)',
          'Auto-scaling: automatically add/remove servers based on traffic',
        ],
      },
      {
        type: 'bullets',
        heading: 'Related concepts',
        items: [
          'CDN: cache static assets geographically close to users',
          'Rate limiting: protect servers from abuse — limit requests per user/IP',
          'Circuit breaker: stop sending requests to a failing downstream service',
          'Health checks: load balancer removes unhealthy servers from rotation automatically',
        ],
      },
    ],
  },

  {
    id: 'microservices',
    title: 'Microservices',
    category: 'systems-design',
    level: 'advanced',
    languages: null,
    estimatedMinutes: 30,
    summary: 'Decompose a monolith into independent, focused services that can be deployed and scaled separately.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Microservices architecture breaks an application into small, independently deployable services, each owning its own data and business logic. Contrast with a monolith — a single deployable unit with a shared database. Microservices increase deployment agility and team autonomy, but introduce distributed systems complexity.',
      },
      {
        type: 'bullets',
        heading: 'Benefits',
        items: [
          'Independent deployability: deploy one service without touching others',
          'Technology flexibility: each service can use a different stack',
          'Targeted scaling: scale the payments service independently of the user service',
          'Team autonomy: small teams own their entire service end-to-end',
        ],
      },
      {
        type: 'bullets',
        heading: 'Challenges',
        items: [
          'Network latency: calls between services are slower than in-process calls',
          'Distributed transactions: maintaining consistency across services is hard',
          'Operational complexity: many services to deploy, monitor, and debug',
          'Data consistency: each service has its own DB, so joins require API calls',
        ],
      },
      {
        type: 'bullets',
        heading: 'Communication patterns',
        items: [
          'Synchronous: REST or gRPC — caller waits for response — simple but tightly coupled',
          'Asynchronous: message queues (RabbitMQ, Kafka) — fire and forget — decoupled',
          'Event-driven: services emit events, others subscribe — highly decoupled',
          'API Gateway: single entry point for all client requests, routes to services',
        ],
      },
    ],
  },

  {
    id: 'cdn',
    title: 'CDNs & Content Delivery',
    category: 'systems-design',
    level: 'beginner',
    languages: null,
    estimatedMinutes: 15,
    summary: 'Serve static assets and cached responses from edge servers close to users to reduce latency.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'A Content Delivery Network (CDN) is a globally distributed network of servers (edge nodes) that caches content close to end users. Instead of every request travelling to your origin server, a CDN serves cached copies from the nearest edge location — dramatically reducing latency for static files, images, videos, and even API responses.',
      },
      {
        type: 'bullets',
        heading: 'What CDNs cache',
        items: [
          'Static assets: images, CSS, JavaScript, fonts — the primary use case',
          'Video/audio: streaming platforms rely entirely on CDNs for delivery',
          'API responses: cacheable GET responses (e.g., public product listings)',
          'Entire HTML pages: for mostly-static sites (e.g., marketing pages)',
        ],
      },
      {
        type: 'bullets',
        heading: 'Key concepts',
        items: [
          'Origin server: your actual application server — CDN pulls from here on cache miss',
          'Edge node / PoP (Point of Presence): CDN server in a geographic region',
          'Cache hit vs miss: hit means served from edge; miss fetches from origin and caches',
          'TTL (Time to Live): how long an edge node keeps a cached copy before revalidating',
          'Cache invalidation: purging stale content from edge nodes after a deploy',
        ],
      },
      {
        type: 'bullets',
        heading: 'When to bring up CDNs in an interview',
        items: [
          'Any system serving media (images, video, audio) at scale',
          'Global user base — CDN reduces latency for users far from your origin',
          'High read traffic on static or rarely-changing content',
          'Reducing load on origin servers (CDN absorbs the majority of traffic)',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the primary purpose of a CDN?',
        options: [
          'To store application databases closer to users',
          'To serve cached content from servers geographically close to the user',
          'To compress data before sending it over the network',
          'To encrypt traffic between client and server',
        ],
        answer: 1,
        explanation: 'CDNs reduce latency by caching content at edge nodes close to users. Instead of requests travelling to a central origin server, users get responses from the nearest PoP.',
      },
      {
        question: 'What happens on a CDN cache miss?',
        options: [
          'The request fails and returns a 404',
          'The CDN fetches the content from the origin server, caches it, and returns it',
          'The user is redirected to the origin server directly',
          'The CDN returns stale content from another edge node',
        ],
        answer: 1,
        explanation: 'On a cache miss the edge node forwards the request to the origin, stores the response for future requests, and returns it to the user. Subsequent requests from nearby users will be cache hits.',
      },
      {
        question: 'What does TTL control in a CDN?',
        options: [
          'How long a user session stays active',
          'How many requests per second the CDN handles',
          'How long an edge node keeps a cached copy before revalidating with the origin',
          'The maximum file size the CDN will cache',
        ],
        answer: 2,
        explanation: 'TTL (Time to Live) is the duration an edge node serves cached content without checking the origin. Short TTL = fresher content but more origin load. Long TTL = better cache hit rate but potentially stale content.',
      },
      {
        question: 'Which type of content benefits most from CDN caching?',
        options: [
          'User-specific API responses (e.g., /api/me)',
          'Real-time database writes',
          'Static assets like images, JS, and CSS that rarely change',
          'Encrypted private messages',
        ],
        answer: 2,
        explanation: 'Static assets are identical for every user and change infrequently — perfect for caching. User-specific or frequently-changing dynamic content has poor cache hit rates and is a poor fit.',
      },
      {
        question: 'Why is cache invalidation considered one of the hardest problems in systems design?',
        options: [
          'CDN APIs are poorly documented',
          'It is impossible to delete content from edge nodes',
          'Determining when cached content is stale and purging it across all edge nodes reliably is complex',
          'Cache invalidation only works for databases, not CDNs',
        ],
        answer: 2,
        explanation: 'Edge nodes are distributed globally. Knowing when to invalidate, propagating the purge quickly to all nodes, and handling race conditions (new requests arriving during invalidation) makes this genuinely hard to get right.',
      },
    ],
  },

  {
    id: 'object-storage',
    title: 'Blob & Object Storage',
    category: 'systems-design',
    level: 'beginner',
    languages: null,
    estimatedMinutes: 15,
    summary: 'Store large unstructured files cheaply and durably using object storage like S3.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Object storage (also called blob storage) is designed for large, unstructured files — images, videos, backups, logs, and documents. Unlike a database, you store and retrieve objects by a unique key. Services like Amazon S3, Google Cloud Storage, and Azure Blob Storage offer virtually unlimited capacity with high durability (typically 99.999999999% — "11 nines").',
      },
      {
        type: 'bullets',
        heading: 'Object storage vs a database',
        items: [
          'Databases: structured data, queryable, transactional — not for large binary files',
          'Object storage: unstructured blobs, accessed by key — cheap at scale, not queryable',
          'Common pattern: store the file in S3, store the S3 URL in your database',
          'You would never store a 100 MB video in a database row',
        ],
      },
      {
        type: 'bullets',
        heading: 'Key features',
        items: [
          'Flat namespace: objects are stored in buckets with a unique key (no true folders)',
          'Durability: data is replicated across multiple availability zones automatically',
          'Lifecycle policies: automatically move old objects to cheaper storage tiers or delete them',
          'Pre-signed URLs: generate a time-limited URL so clients can upload/download directly',
          'Access control: make objects public (CDN-served) or private (signed URLs required)',
        ],
      },
      {
        type: 'bullets',
        heading: 'When to mention it in an interview',
        items: [
          'Any system that handles user-uploaded files (photos, videos, documents)',
          'Storing backups, logs, or data exports',
          'Media pipelines: upload to S3 → trigger processing → store result back to S3',
          'Pair with a CDN: S3 as origin, CloudFront/CDN as the delivery layer',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the correct way to store a user-uploaded profile photo in a typical web application?',
        options: [
          'Store the binary data directly in a database BLOB column',
          'Store the file on the application server\'s local disk',
          'Store the file in object storage (e.g., S3) and save the URL in the database',
          'Convert the image to Base64 and store it as a text column',
        ],
        answer: 2,
        explanation: 'Storing large binary files in a database is expensive and slow. Object storage is optimized for blobs — cheap, durable, scalable. The database stores the URL/key to reference the file.',
      },
      {
        question: 'What is a pre-signed URL in object storage?',
        options: [
          'A URL that never expires for public assets',
          'A time-limited URL that grants temporary access to upload or download an object',
          'A CDN URL that is cached at the edge',
          'A URL that bypasses authentication entirely',
        ],
        answer: 1,
        explanation: 'Pre-signed URLs allow clients to upload or download directly to/from object storage without routing through your application server — reducing load and enabling direct browser-to-S3 uploads.',
      },
      {
        question: 'What does "11 nines" durability mean for object storage?',
        options: [
          '99.99999999999% uptime guarantee',
          '99.999999999% probability that a stored object will not be lost',
          'Objects are stored in 11 geographic regions',
          'The storage system can handle 11 billion requests per second',
        ],
        answer: 1,
        explanation: '11 nines (99.999999999%) durability means the chance of losing a stored object in a given year is approximately 1 in 100 billion. This is achieved by replicating data across multiple availability zones.',
      },
      {
        question: 'What is the typical pattern for combining object storage with a CDN?',
        options: [
          'CDN stores the metadata; object storage serves the files directly',
          'Object storage is the origin; the CDN caches and delivers files to users',
          'Object storage replaces the CDN entirely',
          'CDN writes files to object storage on behalf of the client',
        ],
        answer: 1,
        explanation: 'Object storage (S3) acts as the durable source of truth and CDN origin. The CDN caches files at edge nodes for fast delivery. Users get CDN speed; object storage provides durability and cost-effective storage.',
      },
      {
        question: 'Why is it a bad idea to store large files on an application server\'s local disk?',
        options: [
          'Local disks are too fast for large files',
          'Files are lost if the server is replaced or scaled to multiple instances',
          'Application servers do not support file storage',
          'Local disk storage is more expensive than object storage',
        ],
        answer: 1,
        explanation: 'Local disk storage does not survive server replacements or auto-scaling events. With multiple instances, uploaded files are only on one server. Object storage is shared, durable, and decoupled from your compute layer.',
      },
    ],
  },

  {
    id: 'message-queues',
    title: 'Message Queues & Async Communication',
    category: 'systems-design',
    level: 'intermediate',
    languages: null,
    estimatedMinutes: 25,
    summary: 'Decouple services and handle spiky workloads by passing messages through a durable queue.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'A message queue is a buffer between services. The producer writes a message to the queue; the consumer reads and processes it independently. This decouples the two services — the producer does not wait for the consumer to finish, and the consumer processes at its own pace. Common systems include RabbitMQ, Amazon SQS, and Apache Kafka.',
      },
      {
        type: 'bullets',
        heading: 'Why use a queue?',
        items: [
          'Decoupling: producer and consumer can be deployed, scaled, and fail independently',
          'Load leveling: absorb traffic spikes so consumers process at a steady rate',
          'Durability: messages are persisted — if the consumer crashes, messages are not lost',
          'Retry logic: failed messages can be requeued automatically',
        ],
      },
      {
        type: 'bullets',
        heading: 'Queue vs stream (Kafka)',
        items: [
          'Queue (SQS, RabbitMQ): each message is consumed once and deleted — point-to-point',
          'Stream (Kafka): messages are retained as a log — multiple consumers can independently replay the same events',
          'Use a queue for task distribution (one worker handles each job)',
          'Use a stream for event sourcing, audit logs, or fan-out to multiple consumers',
        ],
      },
      {
        type: 'bullets',
        heading: 'Common patterns',
        items: [
          'Fan-out: one event triggers multiple consumers (e.g., order placed → notify, bill, update inventory)',
          'Dead letter queue (DLQ): messages that fail repeatedly are routed here for inspection',
          'At-least-once delivery: the queue may deliver a message more than once — make consumers idempotent',
          'Backpressure: slow consumers cause the queue to grow — monitor queue depth as a key metric',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the main benefit of introducing a message queue between two services?',
        options: [
          'It makes the communication faster by reducing network hops',
          'It decouples the producer and consumer so they can scale and fail independently',
          'It ensures messages are delivered in strict order',
          'It replaces the need for a database',
        ],
        answer: 1,
        explanation: 'Decoupling is the core benefit. The producer writes to the queue without waiting for the consumer. The consumer processes at its own rate. Neither service needs to know the other exists directly.',
      },
      {
        question: 'What does "at-least-once delivery" mean and what must consumers do to handle it?',
        options: [
          'Every message is delivered exactly once — consumers need no special handling',
          'Messages may be delivered more than once — consumers must be idempotent',
          'Messages are delivered at least once per minute regardless of traffic',
          'The queue guarantees delivery only if the consumer is online',
        ],
        answer: 1,
        explanation: 'At-least-once means the queue retries until it gets an acknowledgement, but network issues can cause duplicates. Consumers must be idempotent — processing the same message twice must produce the same result as processing it once.',
      },
      {
        question: 'What is a Dead Letter Queue (DLQ)?',
        options: [
          'A queue that has been shut down',
          'A queue for high-priority messages',
          'A queue where messages are sent after failing to process successfully after several retries',
          'A queue for messages older than 24 hours',
        ],
        answer: 2,
        explanation: 'A DLQ captures messages that have failed processing repeatedly. This prevents bad messages from blocking the main queue indefinitely and allows engineers to inspect failures without losing the data.',
      },
      {
        question: 'What is the key difference between a message queue (SQS) and a message stream (Kafka)?',
        options: [
          'Kafka is faster; SQS is more reliable',
          'Queue messages are consumed once and deleted; stream messages are retained and can be replayed by multiple consumers',
          'SQS supports fan-out; Kafka does not',
          'Kafka requires a database; SQS does not',
        ],
        answer: 1,
        explanation: 'Queues are point-to-point: one consumer processes each message and it is removed. Streams retain the message log so multiple independent consumers can read the same events at different offsets — essential for event sourcing and audit trails.',
      },
      {
        question: 'You notice the queue depth growing continuously. What does this indicate?',
        options: [
          'Producers are publishing too few messages',
          'The queue is functioning normally',
          'Consumers are processing messages faster than producers publish them',
          'Consumers cannot keep up with the rate of incoming messages',
        ],
        answer: 3,
        explanation: 'A growing queue depth means consumers are falling behind. This is called backpressure. The solution is typically to scale out consumers, optimize processing time, or reduce producer rate.',
      },
    ],
  },

  {
    id: 'rate-limiting',
    title: 'Rate Limiting',
    category: 'systems-design',
    level: 'intermediate',
    languages: null,
    estimatedMinutes: 20,
    summary: 'Protect your system from abuse and overload by capping how many requests a client can make in a time window.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Rate limiting controls how many requests a client can make to your API within a given time window. It protects against abuse (scraping, brute-force attacks), prevents one user from degrading service for others, and helps manage infrastructure costs. Rate limiting is typically enforced at the API gateway or a dedicated middleware layer.',
      },
      {
        type: 'bullets',
        heading: 'Common algorithms',
        items: [
          'Fixed window: count requests in a fixed time bucket (e.g., 100 req/min). Simple but susceptible to burst at window boundary.',
          'Sliding window: track request timestamps over a rolling window — smoother and more accurate than fixed window.',
          'Token bucket: a bucket fills with tokens at a steady rate; each request consumes a token. Allows bursting up to bucket capacity.',
          'Leaky bucket: requests enter a queue and are processed at a fixed rate — smooths out bursts entirely.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Implementation considerations',
        items: [
          'Where to store counts: in-memory is fastest but not shared across instances — use Redis for distributed rate limiting',
          'Key to limit on: per user, per IP, per API key, or per endpoint',
          'Response: return 429 Too Many Requests with a Retry-After header',
          'Soft vs hard limits: warn users approaching the limit before hard rejecting',
        ],
      },
      {
        type: 'bullets',
        heading: 'When to mention in an interview',
        items: [
          'Any public-facing API — rate limiting is expected by default',
          'Login/auth endpoints — prevent brute-force password attacks',
          'Expensive operations (search, AI inference) — protect cost and performance',
          'Multi-tenant SaaS — prevent one customer from consuming all capacity',
        ],
      },
    ],
    quiz: [
      {
        question: 'What HTTP status code should an API return when a client exceeds the rate limit?',
        options: ['400 Bad Request', '401 Unauthorized', '429 Too Many Requests', '503 Service Unavailable'],
        answer: 2,
        explanation: '429 Too Many Requests is the standard code for rate limiting. It should include a Retry-After header telling the client when they can try again.',
      },
      {
        question: 'Why is in-memory rate limiting insufficient for a horizontally scaled API?',
        options: [
          'In-memory storage is too slow for rate limiting',
          'Each server instance tracks its own counter independently, so a client can exceed the real limit by hitting different instances',
          'In-memory counters are not accurate enough',
          'Rate limiting must be done at the database layer',
        ],
        answer: 1,
        explanation: 'With 10 servers each allowing 100 req/min, a client could make 1,000 req/min by distributing requests across all instances. Redis provides a shared counter all instances read and write atomically.',
      },
      {
        question: 'What is the main weakness of the fixed window algorithm?',
        options: [
          'It is too slow to compute',
          'It requires too much memory',
          'A client can double their effective rate by sending requests at the end of one window and the start of the next',
          'It does not support per-user limits',
        ],
        answer: 2,
        explanation: 'If the window is 1 minute and a client sends 100 requests in the last second of window 1, then 100 more in the first second of window 2, they effectively sent 200 requests in 2 seconds — while technically not violating the rule.',
      },
      {
        question: 'Which algorithm allows controlled bursting while still enforcing an average rate?',
        options: ['Fixed window', 'Leaky bucket', 'Token bucket', 'Sliding window log'],
        answer: 2,
        explanation: 'Token bucket refills at a steady rate but lets tokens accumulate up to the bucket capacity. A client can burst up to the bucket size, then is throttled to the refill rate. Leaky bucket smooths output to a fixed rate with no bursting.',
      },
      {
        question: 'What is the most appropriate rate limiting key for preventing brute-force login attacks?',
        options: [
          'Per API key',
          'Per endpoint globally',
          'Per IP address or per username',
          'Per server instance',
        ],
        answer: 2,
        explanation: 'Brute-force attacks come from a specific IP or target a specific username. Limiting per IP blocks attackers from hammering from one machine. Limiting per username prevents distributed attacks on one account across many IPs.',
      },
    ],
  },

  {
    id: 'sharding-replication',
    title: 'Sharding & Replication',
    category: 'systems-design',
    level: 'intermediate',
    languages: null,
    estimatedMinutes: 25,
    summary: 'Scale databases horizontally with sharding and improve availability with replication.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'As a database grows beyond what a single machine can handle, two primary scaling strategies emerge. Replication copies data to multiple nodes for read scalability and fault tolerance. Sharding (horizontal partitioning) splits data across multiple nodes so each shard owns a subset of the data, allowing both reads and writes to scale.',
      },
      {
        type: 'bullets',
        heading: 'Replication',
        items: [
          'Primary-replica: one primary handles writes; replicas sync and handle reads',
          'Read scaling: route read-heavy traffic to replicas, freeing the primary',
          'Replication lag: replicas may be slightly behind — readers can see stale data',
          'Failover: if the primary fails, a replica is promoted — some data may be lost (RPO)',
        ],
      },
      {
        type: 'bullets',
        heading: 'Sharding',
        items: [
          'Each shard is an independent database holding a subset of rows',
          'Shard key: the field used to determine which shard owns a record (e.g., user_id)',
          'Range sharding: shard by value range (A–M on shard 1, N–Z on shard 2) — risk of hot shards',
          'Hash sharding: hash the key modulo N — distributes load evenly but makes range queries hard',
          'Directory sharding: a lookup table maps keys to shards — flexible but single point of failure',
        ],
      },
      {
        type: 'bullets',
        heading: 'Challenges',
        items: [
          'Cross-shard queries: joining data across shards requires application-level logic',
          'Resharding: adding a new shard requires moving data — expensive and disruptive',
          'Hot shards: if the shard key is poorly chosen, one shard receives all the traffic',
          'Transactions: ACID transactions across shards are very hard — typically avoided',
        ],
      },
    ],
    quiz: [
      {
        question: 'What is the difference between replication and sharding?',
        options: [
          'Replication splits data across nodes; sharding copies data to multiple nodes',
          'Replication copies the same data to multiple nodes; sharding splits data across nodes',
          'They are different names for the same technique',
          'Replication is for writes; sharding is for reads',
        ],
        answer: 1,
        explanation: 'Replication: every node has all the data (copies). Sharding: each node has a subset of the data (partitioned). Replication improves read throughput and availability. Sharding improves both read and write throughput by distributing the dataset.',
      },
      {
        question: 'What is replication lag and why does it matter?',
        options: [
          'The time it takes to write to the primary database',
          'The delay between a write on the primary and its appearance on replicas — reads from replicas may return stale data',
          'The time to promote a replica to primary during failover',
          'The additional latency caused by having multiple replicas',
        ],
        answer: 1,
        explanation: 'Replication lag means replicas are slightly behind the primary. A user who writes data and immediately reads it back may get the old value if routed to a replica. Systems must handle this with read-your-writes consistency or routing writes to the primary for critical reads.',
      },
      {
        question: 'What is a "hot shard" problem?',
        options: [
          'A shard that has become corrupted and overheats the CPU',
          'A shard that receives a disproportionate amount of traffic because the shard key is poorly chosen',
          'A shard that is too large and needs to be split',
          'The first shard in a range-partitioned system',
        ],
        answer: 1,
        explanation: 'Hot shards occur when the shard key is skewed — e.g., sharding by region when 80% of users are in one region. That shard becomes a bottleneck while others are underutilized. Good shard key selection distributes load evenly.',
      },
      {
        question: 'Why are cross-shard joins a problem?',
        options: [
          'SQL does not support joins',
          'Shards use different database engines so their query languages are incompatible',
          'Data for a single query lives on different machines — the application must fetch from each shard and merge results',
          'Joins are not needed once data is sharded',
        ],
        answer: 2,
        explanation: 'A database JOIN assumes all data is local. With sharding, related rows may be on different machines. The application must query each shard and merge results in memory — this is slow and complex, which is why schema design should minimize cross-shard access.',
      },
      {
        question: 'What makes hash-based sharding preferable to range-based sharding for write-heavy workloads?',
        options: [
          'Hash sharding supports cross-shard transactions',
          'Hash sharding distributes keys evenly across shards, avoiding hot spots',
          'Hash sharding makes range queries faster',
          'Hash sharding requires fewer shards',
        ],
        answer: 1,
        explanation: 'Hashing the key distributes writes evenly regardless of data patterns. Range sharding is predictable but risks hot spots when writes cluster in a narrow range (e.g., auto-incrementing IDs all go to the last shard).',
      },
    ],
  },

  {
    id: 'cap-theorem',
    title: 'CAP Theorem & Consistency',
    category: 'systems-design',
    level: 'advanced',
    languages: null,
    estimatedMinutes: 25,
    summary: 'Understand the fundamental trade-off between consistency, availability, and partition tolerance in distributed systems.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'The CAP theorem states that a distributed system can guarantee at most two of three properties: Consistency (every read gets the most recent write), Availability (every request gets a response, even if not the latest data), and Partition Tolerance (the system continues operating despite network splits between nodes). Since network partitions are inevitable in distributed systems, the real choice is between CP (consistent under partition) and AP (available under partition).',
      },
      {
        type: 'bullets',
        heading: 'The three properties',
        items: [
          'Consistency: all nodes see the same data at the same time — reads always reflect the latest write',
          'Availability: every request receives a response (not necessarily the latest data)',
          'Partition Tolerance: the system continues operating even if nodes cannot communicate',
        ],
      },
      {
        type: 'bullets',
        heading: 'CP vs AP systems',
        items: [
          'CP (e.g., HBase, Zookeeper, etcd): returns an error or blocks during a partition rather than serve stale data',
          'AP (e.g., Cassandra, DynamoDB, CouchDB): returns potentially stale data during a partition rather than fail',
          'CA is not achievable in a real distributed system — partitions always happen',
          'Traditional single-node SQL is CA — no partition tolerance because there is only one node',
        ],
      },
      {
        type: 'bullets',
        heading: 'Consistency models (beyond CAP)',
        items: [
          'Strong consistency: every read sees the most recent write — expensive, requires coordination',
          'Eventual consistency: all nodes will converge to the same value given no new writes — fast but may return stale data',
          'Read-your-writes: a user always sees their own writes — common UX expectation',
          'Monotonic reads: once a user sees a value, they will not see an older value in a later read',
        ],
      },
    ],
    quiz: [
      {
        question: 'According to CAP theorem, what must every distributed system tolerate?',
        options: [
          'High latency',
          'Data loss',
          'Network partitions',
          'Hardware failures',
        ],
        answer: 2,
        explanation: 'Network partitions (nodes unable to communicate) are inevitable in any distributed system. Because of this, partition tolerance is not optional — the real design choice is whether to prioritize consistency or availability when a partition occurs.',
      },
      {
        question: 'During a network partition, a CP system will:',
        options: [
          'Return potentially stale data to remain available',
          'Return an error or become unavailable rather than serve inconsistent data',
          'Automatically heal the partition',
          'Replicate data faster to compensate',
        ],
        answer: 1,
        explanation: 'CP systems (like ZooKeeper, HBase) choose consistency over availability. Under a partition, they refuse to respond (or return an error) rather than risk serving stale or conflicting data.',
      },
      {
        question: 'Which real-world scenario best suits an AP system?',
        options: [
          'A bank transfer that must not double-spend funds',
          'A distributed lock used for leader election',
          'A social media "like" count that can be slightly stale',
          'A medical record that must always reflect the latest update',
        ],
        answer: 2,
        explanation: 'Like counts do not need perfect accuracy — a few seconds of staleness is acceptable. AP systems are a good fit for social features, shopping carts, and DNS. Banking and medical records require CP because staleness can cause real harm.',
      },
      {
        question: 'What is eventual consistency?',
        options: [
          'Data is consistent before any write is acknowledged',
          'All nodes will converge to the same value given enough time with no new writes',
          'Reads always return the most recent write',
          'The system is consistent only during business hours',
        ],
        answer: 1,
        explanation: 'Eventual consistency guarantees convergence, not immediacy. Replicas may temporarily diverge after a write, but will all reach the same state eventually. It is the model used by DynamoDB, Cassandra, and DNS.',
      },
      {
        question: 'A user posts a tweet and immediately sees it in their feed. Which consistency guarantee does this require?',
        options: [
          'Strong consistency across all nodes',
          'Read-your-writes consistency',
          'Monotonic reads',
          'Linearizability',
        ],
        answer: 1,
        explanation: 'Read-your-writes guarantees that a user always sees their own recent writes, even in an eventually consistent system. This is a weaker guarantee than strong consistency — other users may briefly see the old state, but the author always sees their own update.',
      },
    ],
  },

  {
    id: 'search-indexing',
    title: 'Search & Indexing',
    category: 'systems-design',
    level: 'advanced',
    languages: null,
    estimatedMinutes: 25,
    summary: 'Build full-text and relevance-ranked search with an inverted index and a dedicated search engine.',
    sections: [
      {
        type: 'paragraph',
        heading: 'Overview',
        body: 'Traditional databases use B-tree indexes optimized for exact lookups and range queries. Full-text search — ranking results by relevance, handling typos, and searching across fields — requires a different data structure: the inverted index. Elasticsearch and Apache Solr are the dominant dedicated search engines, both built on Apache Lucene.',
      },
      {
        type: 'bullets',
        heading: 'How an inverted index works',
        items: [
          'Tokenize documents into terms (words), applying normalization (lowercase, stemming)',
          'Build a map: term → list of document IDs that contain that term (the "posting list")',
          'At query time: look up each query term, intersect/union the posting lists, rank results',
          'Far faster than scanning every document — like a book index vs reading every page',
        ],
      },
      {
        type: 'bullets',
        heading: 'Relevance ranking',
        items: [
          'TF-IDF: terms that appear often in a doc but rarely across all docs are more significant',
          'BM25: the modern default in Elasticsearch — improves on TF-IDF with document length normalization',
          'Boosting: give certain fields (title, tags) more weight than body text',
          'Vector search: embed documents and queries as vectors, find nearest neighbours — powers semantic search',
        ],
      },
      {
        type: 'bullets',
        heading: 'Architecture pattern',
        items: [
          'Primary database (Postgres/MySQL) is the source of truth — never search directly against it',
          'A sync pipeline (CDC or event stream) propagates writes to the search index',
          'Elasticsearch cluster handles all search queries',
          'Index lag: the search index may be seconds or minutes behind the primary — acceptable for most search use cases',
        ],
      },
    ],
    quiz: [
      {
        question: 'What data structure powers full-text search engines like Elasticsearch?',
        options: ['B-tree index', 'Hash map', 'Inverted index', 'Trie'],
        answer: 2,
        explanation: 'An inverted index maps each term to the list of documents containing it. This allows finding all documents that match a query term in O(1) rather than scanning every document.',
      },
      {
        question: 'Why should you not run full-text search queries directly against your primary database?',
        options: [
          'Databases do not support text queries',
          'Full-text search is computationally expensive and would slow down transactional workloads on the primary',
          'Search engines are cheaper to operate than databases',
          'Databases cannot store text data',
        ],
        answer: 1,
        explanation: 'Full-text search queries (LIKE \'%term%\', text scanning) are expensive and do not use standard indexes well. Running them on your primary database competes with transactional workloads. A dedicated search engine handles this load separately.',
      },
      {
        question: 'What is index lag and when is it acceptable?',
        options: [
          'The time it takes to build an index from scratch — never acceptable',
          'The delay between a write to the primary database and its appearance in the search index — acceptable when slight staleness is tolerable',
          'Slower search performance due to a large index — always a critical issue',
          'The latency added by relevance ranking — acceptable only for small datasets',
        ],
        answer: 1,
        explanation: 'Index lag is acceptable for most search use cases (e-commerce product search, article search) because users do not need millisecond-fresh results. It is not acceptable when users must immediately search their own recent writes.',
      },
      {
        question: 'What does TF-IDF measure?',
        options: [
          'How fast a query executes against the index',
          'The importance of a term in a document relative to how common it is across all documents',
          'The total number of documents in the index',
          'How many fields a document has',
        ],
        answer: 1,
        explanation: 'TF (term frequency) measures how often a term appears in a document. IDF (inverse document frequency) down-weights terms that appear in many documents (like "the"). TF-IDF balances both to score how relevant a term is to a specific document.',
      },
      {
        question: 'What is the role of a sync pipeline between the primary database and a search index?',
        options: [
          'To back up the primary database',
          'To propagate writes from the primary database to the search index so they stay in sync',
          'To translate SQL queries into search engine queries',
          'To compress data before storing it in the search index',
        ],
        answer: 1,
        explanation: 'The primary database is the source of truth. Every write must eventually reach the search index. A sync pipeline (using CDC, event streaming, or application-level dual-writes) ensures the index stays up to date without coupling the primary database to search.',
      },
    ],
  },

  {
    id: 'systems-design-interview',
    title: 'How to Ace a Systems Design Interview',
    category: 'systems-design',
    level: 'intermediate',
    languages: null,
    estimatedMinutes: 30,
    summary: 'A step-by-step framework for structuring your answer, asking the right questions, and communicating your design clearly.',
    sections: [
      {
        type: 'paragraph',
        heading: 'What interviewers are actually evaluating',
        body: 'Systems design interviews are not about finding a single correct answer — there is none. Interviewers evaluate how you think: do you ask clarifying questions before diving in? Do you reason about trade-offs? Can you communicate a complex architecture clearly? Do you know when to go deep vs. stay high-level? The framework below gives you a repeatable structure so you spend mental energy on the right things.',
      },
      {
        type: 'bullets',
        heading: 'The 4-step framework',
        items: [
          '1. Clarify requirements (~5 min) — nail down scope before touching the design',
          '2. Estimate scale (~5 min) — back-of-envelope numbers that drive your decisions',
          '3. High-level design (~15 min) — boxes and arrows, major components, data flow',
          '4. Deep dives (~15 min) — go deep on the parts the interviewer cares about most',
        ],
      },
      {
        type: 'paragraph',
        heading: 'Step 1: Clarify requirements',
        body: 'Never start designing immediately. Spend the first few minutes asking questions to scope the problem. Interviewers intentionally leave prompts vague ("design Twitter") to see if you\'ll blindly over-engineer or smartly scope down.',
      },
      {
        type: 'bullets',
        heading: 'Questions to ask in step 1',
        items: [
          'Who are the users and what is the core user action? (e.g., post a tweet, view a feed)',
          'What scale are we targeting? (100 users? 100 million?)',
          'Read-heavy or write-heavy? (a news feed is read-heavy; a logging system is write-heavy)',
          'What are the latency requirements? (real-time vs. eventually consistent is fine)',
          'What are we NOT building? (explicitly out-of-scope features save you from rabbit holes)',
        ],
      },
      {
        type: 'paragraph',
        heading: 'Step 2: Estimate scale',
        body: 'Quick back-of-envelope math anchors your design decisions. You don\'t need precision — orders of magnitude are enough. The goal is to know whether you\'re building for 1,000 requests/second or 1,000,000, because that determines whether you need sharding, a CDN, a message queue, etc.',
      },
      {
        type: 'bullets',
        heading: 'Useful numbers to know',
        items: [
          '1 million DAU × 10 actions/day = ~115 requests/second (low traffic)',
          '100 million DAU × 10 actions/day = ~11,500 requests/second (needs serious scaling)',
          'A single database server handles ~10,000 reads/sec comfortably',
          '1 TB = 1,000 GB; storing 1 byte per user per day for 1B users = ~365 GB/year',
          'A typical API response is 1–10 KB; a photo is 100 KB–1 MB; a video is 100 MB–1 GB',
        ],
      },
      {
        type: 'paragraph',
        heading: 'Step 3: High-level design',
        body: 'Draw the major components and how data flows between them. Start with the client, add an API layer, then storage. Think in terms of: where does data come in, where is it stored, how is it retrieved. Speak out loud as you draw — interviewers want to follow your reasoning, not guess at your diagram.',
      },
      {
        type: 'bullets',
        heading: 'Standard components to consider',
        items: [
          'Load balancer — distributes traffic across API servers',
          'API servers — stateless; horizontally scalable',
          'Primary database — source of truth (SQL or NoSQL depending on data model)',
          'Cache (Redis) — reduces database load for hot reads',
          'CDN — serves static assets and media at the edge',
          'Object storage (S3) — stores user-uploaded files',
          'Message queue (Kafka/SQS) — decouples async processing',
          'Search index (Elasticsearch) — powers text/relevance search',
        ],
      },
      {
        type: 'bullets',
        heading: 'Step 4: Deep dives',
        body: 'After the high-level design, the interviewer will steer you toward the interesting parts. Common deep dive areas:',
        items: [
          'Database schema — what tables/collections, what indexes, how do you avoid N+1 queries?',
          'Feed generation — fan-out on write (push) vs. fan-out on read (pull) trade-offs',
          'Handling hotspots — what happens when one user has 10M followers?',
          'Failure modes — what happens when the database is unavailable? The cache is cold?',
          'Consistency guarantees — do users need to read their own writes immediately?',
        ],
      },
      {
        type: 'bullets',
        heading: 'Communication tips',
        items: [
          'Say what you\'re drawing before you draw it — keep the interviewer oriented',
          'State assumptions explicitly: "I\'m assuming this is read-heavy, so I\'ll add a cache"',
          'Mention trade-offs rather than presenting one choice as obviously correct',
          'Check in periodically: "Does this direction make sense, or should I focus elsewhere?"',
          'If you don\'t know something, say so and reason from first principles',
        ],
      },
    ],
    practiceQuestions: [
      'Design a URL shortener like bit.ly. Users can shorten a URL and share it; clicking the short URL redirects to the original.',
      'Design a social media feed like Twitter. Users can post tweets and see a feed of tweets from people they follow.',
      'Design a file storage and sharing service like Dropbox. Users can upload, sync, and share files across devices.',
      'Design a video streaming platform like YouTube. Users can upload videos and stream them on demand.',
      'Design a ride-sharing app like Uber. Riders can request a ride; nearby drivers accept and navigate to the pickup.',
    ],
  },
]
