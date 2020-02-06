 # Initial Information
 
 ## 1. Create an interactive Gantt chart in React for visualizing multiple event types.
 
 BT has a large mobile workforce working flexible attendance patterns (24x7) and automated work allocation. Applications to monitor and interact with this work schedule invariably include a Gantt view, visualizing the events as bars within the project view. Many standard Gantt widgets exist but they tend to provide relatively generic behaviour and can be difficult to customise. Further, options for interactivity are poor and overlapping events tends not to be supported well. For example engineers will have a shift pattern and tasks need to be overlaid within that visual window. This project will design and build a bespoke Gantt view focussed on the work allocation view and should include: - Engineers as the rows - Working periods of the engineers (various types – scheduled, overtime, lunch) - Absences (various types – sick, training, van time) - Tasks allocated (which will overlap the above) – various types and priorities - Progress indications on the task (eg showing 50% complete) - Expected completion times on Tasks (which may extend beyond the scheduled task times) - Interactivity – each element should have hooks to permit interception of mouse clicks, drag/drop events to enable interactive behaviours to be built on top 
 
 ## 2. Create a visualization to support the creation and editing of attendance templates.
 
 BT has a large mobile workforce working flexible attendance patterns (24x7) and automated work allocation. This workforce’s attendance patterns are arranged into templates called ‘roster patterns’ with multiple employees working across the same pattern on different weeks. These patterns are essentially a matrix of start and end times by day of the week repeated over multiple weeks. Creating and editing these templates requires typing these start and end times into a series of boxes on screen, arranged as a matrix. This project will look at alternative visualizations and UI editing paradigms which would be better suited to maintain these data types. 
 
 ## 3. Create novel visualization around capacity planning.
 
 BT needs to plan its engineering resource to ensure demand for provision and repair activities can be met. This involves matching known demand, together with forecasted demand against available resource. This available resource is the set of scheduled attendees, 3rd-party resource, loaned engineers less any absences (or predicted absences). This information is further dimensioned by geography and by work type. Currentlym this information is presented in tabular form with the various measures in rows and the days in columns (like a spreadsheet). Cell highlighting is used to indicate measures that are of concern (eg too little broadband resource next Thursday in the Newport area). However, this approach is tedious to use as the dimensioning of the data effectively creates many views of this report which require systematic reading to interpret. This project will look atinnovative alternatives to presenting this data in a way that more intuitively and directly answers the user’s question – do I have enough resource for the work I’ve commited to? This could be split into two projects where one looks at a more traditional screen-based visualization and another looks at applying emerging technologies such as VR to the problem. 

 ## 4. Build visualization around hot code path analysis data.
 
 Our Software Engineering Research is looking at ways to provide insight into legacy code bases as a first stage to transforming their architecture to more cloud-ready standards. As part of this work, a number of different measures are being captured statically from the code, from the processes that build it and from the runtime behaviour. One such data source is 'hot code path analysis'. This essentially considers the dynamic behaviour of the application