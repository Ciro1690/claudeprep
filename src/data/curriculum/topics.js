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
        language: 'csharp',
        snippet: `public int[] TwoSum(int[] numbers, int target) {
    int left = 0, right = numbers.Length - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return new int[] { left + 1, right + 1 };
        else if (sum < target) left++;
        else right--;
    }
    return new int[] {};
}`,
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
        language: 'csharp',
        snippet: `public int LengthOfLongestSubstring(string s) {
    var seen = new Dictionary<char, int>();
    int maxLen = 0, left = 0;

    for (int right = 0; right < s.Length; right++) {
        if (seen.ContainsKey(s[right]) && seen[s[right]] >= left)
            left = seen[s[right]] + 1;

        seen[s[right]] = right;
        maxLen = Math.Max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
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
        language: 'csharp',
        snippet: `public int[] TwoSum(int[] nums, int target) {
    var seen = new Dictionary<int, int>(); // value -> index

    for (int i = 0; i < nums.Length; i++) {
        int complement = target - nums[i];
        if (seen.ContainsKey(complement))
            return new int[] { seen[complement], i };
        seen[nums[i]] = i;
    }
    return new int[] {};
}`,
        note: 'For each number, check if its complement already exists in the map. This runs in O(n) time and O(n) space.',
      },
      {
        type: 'bullets',
        heading: 'Common operations in C#',
        items: [
          'dict.TryGetValue(key, out val) — safe get without exception',
          'dict.GetValueOrDefault(key, 0) — get with fallback',
          'dict.ContainsKey(key) — existence check',
          'set.Contains(val) — O(1) membership test',
        ],
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
        language: 'csharp',
        snippet: `public int BinarySearch(int[] nums, int target) {
    int left = 0, right = nums.Length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2; // avoids overflow
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
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
        language: 'csharp',
        snippet: `public IList<int> InorderTraversal(TreeNode root) {
    var result = new List<int>();
    Dfs(root, result);
    return result;
}

private void Dfs(TreeNode node, List<int> result) {
    if (node == null) return;
    Dfs(node.left, result);    // left
    result.Add(node.val);      // root
    Dfs(node.right, result);   // right
}`,
        note: 'Pre-order: root → left → right. In-order: left → root → right. Post-order: left → right → root.',
      },
      {
        type: 'code',
        heading: 'BFS: Level order traversal',
        language: 'csharp',
        snippet: `public IList<IList<int>> LevelOrder(TreeNode root) {
    var result = new List<IList<int>>();
    if (root == null) return result;

    var queue = new Queue<TreeNode>();
    queue.Enqueue(root);

    while (queue.Count > 0) {
        int levelSize = queue.Count;
        var level = new List<int>();
        for (int i = 0; i < levelSize; i++) {
            var node = queue.Dequeue();
            level.Add(node.val);
            if (node.left != null) queue.Enqueue(node.left);
            if (node.right != null) queue.Enqueue(node.right);
        }
        result.Add(level);
    }
    return result;
}`,
        note: 'Snapshot queue.Count at the start of each loop to process exactly one level per iteration.',
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
        language: 'csharp',
        snippet: `public int ClimbStairs(int n) {
    if (n <= 2) return n;

    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
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
        language: 'csharp',
        snippet: `public ListNode ReverseList(ListNode head) {
    ListNode prev = null, curr = head;

    while (curr != null) {
        ListNode next = curr.next; // save next
        curr.next = prev;          // reverse pointer
        prev = curr;               // advance prev
        curr = next;               // advance curr
    }
    return prev; // new head
}`,
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
        language: 'csharp',
        snippet: `public int ShortestPath(List<List<int>> graph, int src, int dst) {
    var visited = new HashSet<int> { src };
    var queue = new Queue<int>();
    queue.Enqueue(src);
    int steps = 0;

    while (queue.Count > 0) {
        int size = queue.Count;
        for (int i = 0; i < size; i++) {
            int node = queue.Dequeue();
            if (node == dst) return steps;
            foreach (int neighbor in graph[node]) {
                if (visited.Add(neighbor))
                    queue.Enqueue(neighbor);
            }
        }
        steps++;
    }
    return -1;
}`,
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
]
