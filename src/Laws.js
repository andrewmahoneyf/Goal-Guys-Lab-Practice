import React from 'react';

class AmendmentsPage extends React.Component {
  render() {
    return (
        <main className="container">
          <h2>THE BILL OF RIGHTS </h2>
          <p>The first 10 amendments to the Constitution make up the Bill of Rights. Written by James Madison in response to calls from several states for greater constitutional protection for individual liberties, the Bill of Rights lists specific prohibitions on governmental power. For example, what the Founders saw as the natural right of individuals to speak and worship freely was protected by the First Amendment’s prohibitions on Congress from making laws establishing a religion or abridging freedom of speech. For another example, the natural right to be free from unreasonable government intrusion in one’s home was safeguarded by the Fourth Amendment’s warrant requirements.</p>
          <h3>Amendment I</h3>
          <p>Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the government for a redress of grievances.</p>
          <h3>Amendment II</h3>
          <p>A well regulated militia, being necessary to the security of a free state, the right of the people to keep and bear arms, shall not be infringed.</p>
          <h3>Amendment III</h3>
          <p>No soldier shall, in time of peace be quartered in any house, without the consent of the owner, nor in time of war, but in a manner to be prescribed by law.</p>
          <h3>Amendment IV</h3>
          <p>The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no warrants shall issue, but upon probable cause, supported by oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.</p>
          <h3>Amendment V</h3>
          <p>No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a grand jury, except in cases arising in the land or naval forces, or in the militia, when in actual service in time of war or public danger; nor shall any person be subject for the same offense to be twice put in jeopardy of life or limb; nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.</p>
          <h3>Amendment VI</h3>
          <p>In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the state and district wherein the crime shall have been committed, which district shall have been previously ascertained by law, and to be informed of the nature and cause of the accusation; to be confronted with the witnesses against him; to have compulsory process for obtaining witnesses in his favor, and to have the assistance of counsel for his defense.</p>
          <h3>Amendment VII</h3>
          <p>In suits at common law, where the value in controversy shall exceed twenty dollars, the right of trial by jury shall be preserved, and no fact tried by a jury, shall be otherwise reexamined in any court of the United States, than according to the rules of the common law.</p>
          <h3>Amendment VIII</h3>
          <p>Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted.</p>
          <h3>Amendment IX</h3>
          <p>The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people.</p>
          <h3>Amendment X</h3>
          <p>The powers not delegated to the United States by the Constitution, nor prohibited by it to the states, are reserved to the states respectively, or to the people.</p>

        </main>
    );
  }
}

class FundamentalRightsPage extends React.Component {
  render() {
    return (
        <main className="container">
          <h2>Fundamental Rights</h2>
        </main>
    );
  }
}

class CurrentBillsPage extends React.Component {
  render() {
    return (
        <main className="container">
          <h2>Current Bills and Votes</h2>
        </main>
    );
  }
}

class LawyerPage extends React.Component {
  render() {
    return (
        <main className="container">
          <h2>Contact a Lawyer</h2>
        </main>
    );
  }
}

class MythsPage extends React.Component {
  render() {
    return (
        <main className="container">
          <h2>Popular Myths</h2>
        </main>
    );
  }
}

export {AmendmentsPage, FundamentalRightsPage, CurrentBillsPage, LawyerPage, MythsPage};