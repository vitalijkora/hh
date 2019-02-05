import React from 'react'
import classes from './ClusterGroup.scss'

export default props => {
	let clusters={};
	props.clusters.forEach((item)=> {
		clusters[item.id] = item
	});
	let value={
		'experience':props.experience,
		'area':props.area
	};
	let renderCluster = (updateData,cluster) =>{
		if (value[cluster]!=="") return (
			<li onClick={ ()=> updateData(cluster,"","")} >
				<span>{value[cluster]}</span>
				<span>X</span>
			</li>
		);
		if (clusters[cluster]===undefined) return false;
		return(
			clusters[cluster].items.map((item, index) => {
				let start=item.url.indexOf(cluster)+cluster.length+1,
						end=item.url.indexOf("&",	start),
						clusterId=end>start ?
							item.url.substring(start, end) :
							item.url.substring(start);
				return(
					<li key={index} onClick={ ()=> updateData(cluster,clusterId,item.name)} >
							<span>{item.name}</span>
							<span>{item.count}</span>
					</li>
				)
			}
		)
		)
	};
	return(
		<div className={classes.ClusterGroup}>
			<div>Опыт работы</div>
			<ul>
				{renderCluster(props.updateData,"experience")}
			</ul>
			<div>Регион</div>
			<ul id={"clusterArea"} className={props.areaHidden?classes.Hidden:""}>
				{renderCluster(props.updateData,"area")}
			</ul>
				<div
					onClick={()=> props.updateData("areaHidden",!props.areaHidden)}
					className={classes.Hider}
				>
					{props.area!==""?"":props.areaHidden?"Показать все":"Свернуть"}
				</div>
		</div>
	)
}
